// controllers/certificateController.js
const Certificate = require('../models/Certificate');
const QRCode = require('qrcode');
const {errorHandler} = require('../helpers/dbErrorHandler');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const moment = require("moment");

exports.create = async (req, res) => {

    try {
        const {
            projectTitle,
            contractor,
            tenderId,
            partOfWorks,
            wholeOfWorks,
            plannedCompletionDate,
            actualCompletionDate,
            defectsDate,
            amount,
            projectManager,
            defectsText,
            facilityIncharge,
            projectSupervisor,
            completionPercentage
        } = req.body;

        const newCert = new Certificate({
            projectTitle,
            contractor,
            facilityName: 'Vihiga County Referral Hospital',
            tenderId,
            defectsText,
            facilityIncharge,
            projectSupervisor,
            partOfWorks,
            wholeOfWorks,
            plannedCompletionDate,
            actualCompletionDate,
            defectsDate,
            completionPercentage,
            createdBy: req.profile._id,
            amount,
            projectManager
        });

        await newCert.save();
        res.json(newCert);
    } catch (err) {
        console.log(err)
        res.status(400).json({error: errorHandler(err)}); // Return with a 400 status code
    }
};

exports.list = async (req, res) => {
    try {
        const certificates = await Certificate.find({}).populate('createdBy', 'name');
        res.json(certificates);
    } catch (err) {
        res.status(500).json({error: errorHandler(err)});
    }
};

exports.listByUser = async (req, res) => {
    try {
        const userId = req.profile._id; // Assuming auth middleware has set this
        const certificates = await Certificate.find({createdBy: userId}).populate('createdBy', 'name');

        if (!certificates.length) {
            return res.status(404).json({message: 'No certificates found for this user.'});
        }

        res.json(certificates);
    } catch (err) {
        res.status(500).json({error: errorHandler(err)});
    }
};
exports.read = async (req, res) => {
    try {
        const cert = await Certificate.findById(req.params.id);
        if (!cert) return res.status(404).send('Certificate not found');

        res.send(cert);
    } catch (err) {
        res.status(500).send({error: errorHandler(err)});
    }
};

exports.remove = async (req, res) => {
    try {
        await Certificate.findByIdAndRemove(req.params.id);
        res.send({message: 'Certificate deleted successfully'});
    } catch (err) {
        res.status(500).send({error: errorHandler(err)});
    }
};


exports.canModifyOrDeleteCert = async (req, res, next) => {
    try {
        const certId = req.params.id;
        const cert = await Certificate.findById(certId);

        if (!cert) {
            return res.status(404).json({error: 'Certificate not found.'});
        }

        // Check if the user is the creator or an admin
        const authorizedUser = req.profile._id.toString() === cert.createdBy._id.toString() || req.profile.role === 1;

        if (!authorizedUser) {
            return res.status(403).json({error: 'You are not authorized to modify or delete this certificate.'});
        }

        next();
    } catch (err) {
        res.status(400).json({error: errorHandler(err)});
    }
};


exports.update = async (req, res) => {
    try {
        const certId = req.params.id;
        const updateFields = req.body;

        const updatedCert = await Certificate.findByIdAndUpdate(certId, updateFields, {new: true});

        if (!updatedCert) return res.status(404).send('Certificate not found');

        res.send(updatedCert);
    } catch (err) {
        res.status(500).send({error: errorHandler(err)});
    }
};


exports.verify = async (req, res) => {
    try {
        const {id} = req.params; // Certificate ID
        const certificate = await Certificate.findById(id);

        if (!certificate) {
            return res.status(404).json({error: "Certificate not found"});
        }

        res.json({valid: true, certificate});
    } catch (err) {
        res.status(500).json({error: errorHandler(err)});
    }
};


exports.downloadPDF = async (req, res) => {
    try {
        const {id} = req.params;
        const certificate = await Certificate.findById(id).populate('createdBy', 'name');

        if (!certificate) return res.status(404).json({error: "Certificate not found"});

        const {
            contractor,
            amount,
            tenderId,
            partOfWorks,
            wholeOfWorks,
            plannedCompletionDate,
            actualCompletionDate,
            defectsDate,
            projectManager,
            projectTitle,
            facilityName,
            serialNumber,
            completionPercentage,
            defectsText,
            facilityIncharge,
            projectSupervisor
        } = certificate;

        const createdAt = new Date(certificate.createdAt).toDateString(); // Convert creation date to a readable string

        const doc = new PDFDocument({size: 'A4', layout: 'landscape'});

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename="certificate-${id}.pdf"`);

        doc.pipe(res);

        const margin = 70; // Set a margin for general alignment
        const maxWidth = 140;
        const maxHeight = 50;

        const statementWidth = 600; // Set a specific width for the statement
        let statementX = doc.page.width / 2 - statementWidth / 2; // Calculate X to center the statement


        // Add the background image
        doc.image('assets/cert1.png', 0, 0, {width: doc.page.width, height: doc.page.height});

        // Header: County Government, Department of Health
        doc.font('fonts/Cardo-Bold.ttf').fontSize(18).fill('#021c27')
            .text("COUNTY GOVERNMENT OF VIHIGA", margin, margin, {width: doc.page.width - 2 * margin, align: 'center'});

        doc.font('fonts/Cardo-Bold.ttf').fontSize(13).fill('#021c27')
            .text("DEPARTMENT OF HEALTH", margin, margin + 25, {width: doc.page.width - 2 * margin, align: 'center'});

        // Logo dimensions and scaling
        const originalLogoWidth = 298;
        const originalLogoHeight = 169;
        const scale = 0.3;  // Scaling factor, adjust as needed for balance between visibility and space
        const logoWidth = originalLogoWidth * scale;
        const logoHeight = originalLogoHeight * scale;
        const logoX = doc.page.width / 2 - logoWidth / 2;  // Center the scaled logo
        const logoY = margin + 50;

        // Logo and contact details layout

        // Place the logo with scaled dimensions
        doc.image('assets/logo.png', logoX, logoY, {width: logoWidth, height: logoHeight});


        // Define fixed start positions for the text blocks relative to the page center, maintaining uniform margins
        const textBlockWidth = 180; // Adjust the width of the text blocks if needed
        const leftTextX = logoX - textBlockWidth - 50; // Position left text block to the left of the logo with some spacing
        const rightTextX = logoX + logoWidth + 50; // Position right text block to the right of the logo with some spacing


        // Left-aligned text block
        doc.font('fonts/Cardo-Italic.ttf').fontSize(8).fill('#021c27')
            .text("E-mail: info@vihigahospital.go.ke\nMobile No: +254-723103564\nOffice No: +254-773223151", leftTextX, logoY, {
                width: textBlockWidth,
                align: 'right'
            });

        // Right-aligned text block
        doc.font('fonts/Cardo-Italic.ttf').fontSize(7).fill('#021c27')
            .text(`OFFICE OF THE MEDICAL SUPERINTENDENT\nVIHIGA COUNTY REFERRAL HOSPITAL\nP.O. BOX 1069 – 50300 MARAGOLI.\n${createdAt}`, rightTextX, logoY, {
                width: textBlockWidth,
                align: 'left'
            });

        // Place the 'CERTIFICATE' text
        doc.font('fonts/CinzelDecorative-Bold.ttf').fontSize(18).fill('#021c27')
            .text('CERTIFICATE OF COMPLETION', margin, margin + 120, {
                width: doc.page.width - 2 * margin,
                align: 'center'
            });
        // // Add 'of completion' below 'CERTIFICATE' with a smaller font size


        const formattedAmount = amount.toLocaleString();
        // Details table
        const details = [
            ["Facility Name", facilityName],
            ["Project Title", projectTitle],
            ["Project Manager", projectManager],
            ["Contractor", contractor],
            ["Tender Id", tenderId],
            ["Part Of Works", partOfWorks],
            ["Whole of Works", wholeOfWorks],
            ["Planned Completion Date", plannedCompletionDate],
            ["Actual Completion Date", new Date(actualCompletionDate).toDateString()],
            ["Completion Percentage", `${completionPercentage} %`],
            ["Defects Date", new Date(defectsDate).toDateString()],
            ["Certificate Amount", `KES ${formattedAmount}`],
        ];

        const boxWidth = doc.page.width / 2;  // Set box width for the details table
        let boxY = margin + 160; // Starting Y position for the details

        const labelWidth = 150;
        const valueWidth = boxWidth - labelWidth;// Calculate the value width as the remaining space within the boxWidth


        const tableWidth = labelWidth + valueWidth; // Calculate the total width of the table
        const tableStartX = (doc.page.width - tableWidth) / 2; // Calculate the starting X position to center the table

        details.forEach(([label, value]) => {
            // Draw the label left-aligned within its designated space
            doc.font('fonts/Cardo-Regular.ttf').fontSize(8).fill('#021c27')
                .text(`${label}:`, tableStartX, boxY, {width: labelWidth, align: 'left'});

            // Draw the value left-aligned within its designated space
            doc.font('fonts/Cardo-Bold.ttf').fontSize(8).fill('#021c27')
                .text(value, tableStartX + labelWidth, boxY, {width: valueWidth, align: 'left'});
            boxY += 15; // Increment Y position for the next row
        });

        boxY += 5; // Gap before the statement
        const cleanDefectsText = defectsText.replace(/\n/g, ' ');

        doc.font('fonts/Poppins-Light.ttf').fontSize(9).fill('#021c27')
            .text(cleanDefectsText, statementX, boxY, {
                width: statementWidth,
                align: 'center'
            });

        boxY += 20; // Ensure enough space after the statement


        const signatures = [
            {title: "Project Manager", name: projectManager.toUpperCase()},
            {title: "Facility In-charge", name: facilityIncharge.toUpperCase()}, // Adjust name as needed
            {title: "Contractor", name: contractor.toUpperCase()},
            {title: "Supervisor", name: projectSupervisor.toUpperCase()} // Adjust name as needed
        ];

        // Initialize variables for the positions and dimensions
        const columnWidth = doc.page.width / 3; // Divide page into three columns
        const qrCodeSize = 80; // Size of the QR code
        const qrCodePosition = (doc.page.width / 2) - (qrCodeSize / 2); // Center position for QR code
        const leftColumnStart = doc.page.width / 2 - maxWidth - 60// Start of left column with additional margin
        const rightColumnStart = 2 * columnWidth - 25; // Start of right column
        const signatureSpacing = 40; // Space between signature blocks

// Generate QR Code and place in the center

        const isDev = process.env.NODE_ENV === 'development';
        const baseUrl = isDev ? process.env.CLIENT_URL_DEV : process.env.CLIENT_URL;
        const link = `${baseUrl}/certificate/verify/${id}`;


        const qrCodeURL = await QRCode.toDataURL(link);
        doc.image(qrCodeURL, qrCodePosition, boxY, {fit: [qrCodeSize, qrCodeSize]});

// Place signatures on the left
        signatures.slice(0, 2).forEach(({title, name}, idx) => {
            const yPosition = boxY + (idx * signatureSpacing); // Position each signature block with defined spacing

            // Print title, name, and signature in order
            doc.font('fonts/AlexBrush-Regular.ttf').fontSize(14).fill('#021c27')
                .text(title, leftColumnStart, yPosition);
            doc.font('fonts/Poppins-Regular.ttf').fontSize(6).fill('#021c27')
                .text(`Name: ${name}`, leftColumnStart, yPosition + 15);
            doc.font('fonts/Poppins-Regular.ttf').fontSize(6).fill('#021c27')
                .text(`Sign: `, leftColumnStart, yPosition + 30);
        });

// Place signatures on the right
        signatures.slice(2, 4).forEach(({title, name}, idx) => {
            const yPosition = boxY + (idx * signatureSpacing); // Position each signature block with defined spacing

            // Print title, name, and signature in order
            doc.font('fonts/AlexBrush-Regular.ttf').fontSize(14).fill('#021c27')
                .text(title, rightColumnStart, yPosition);
            doc.font('fonts/Poppins-Regular.ttf').fontSize(6).fill('#021c27')
                .text(`Name: ${name}`, rightColumnStart, yPosition + 15);
            doc.font('fonts/Poppins-Regular.ttf').fontSize(6).fill('#021c27')
                .text(`Sign: `, rightColumnStart, yPosition + 30);
        });

        const serialNumberX = margin;
        const serialNumberY = doc.page.height - 130; // Adjust Y position to align with the bottom
        doc.font('fonts/Poppins-Regular.ttf').fontSize(9).fill('#021c27')
            .text(`SN: ${serialNumber}`, serialNumberX, serialNumberY);

        doc.end();


    } catch (err) {
        console.log(err);
        res.status(500).json({error: errorHandler(err)});
    }
};


