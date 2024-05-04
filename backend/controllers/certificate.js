// controllers/certificateController.js
const Certificate = require('../models/certificate');
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
        const statementWidth = 600; // Set a specific width for the statement
        let statementX = doc.page.width / 2 - statementWidth / 2; // Calculate X to center the statement
        // Logo dimensions and scaling
        const originalLogoWidth = 298;
        const originalLogoHeight = 169;
        const scale = 0.33;  // Scaling factor, adjust as needed for balance between visibility and space
        const logoWidth = originalLogoWidth * scale;
        const logoHeight = originalLogoHeight * scale;
        const logoX = doc.page.width / 2 - logoWidth / 2;  // Center the scaled logo
        const logoY = margin + 70;
        // Define fixed start positions for the text blocks relative to the page center, maintaining uniform margins
        const textBlockWidth = maxWidth; // Adjust the width of the text blocks if needed
        const leftTextX = logoX - textBlockWidth - 50; // Position left text block to the left of the logo with some spacing
        const rightTextX = logoX + logoWidth + 50; // Position right text block to the right of the logo with some spacing
        const boxWidth = doc.page.width / 2;  // Set box width for the details table
        let boxY = margin + 170; // Starting Y position for the details
        const labelWidth = 160;
        const valueWidth = boxWidth - labelWidth;// Calculate the value width as the remaining space within the boxWidth
        const columnWidth = doc.page.width / 3; // Divide page into three columns
        const qrCodeSize = 80; // Size of the QR code
        const qrCodePosition = (doc.page.width / 2) - (qrCodeSize / 2); // Center position for QR code

        const leftColumnStart = doc.page.width / 2 - maxWidth - 60// Start of left column with additional margin
        const rightColumnStart = 2 * columnWidth - 25; // Start of right column
        const signatureSpacing = 48; // Space between signature blocks
        const isDev = process.env.NODE_ENV === 'development';
        const baseUrl = isDev ? process.env.CLIENT_URL_DEV : process.env.CLIENT_URL;
        const link = `${baseUrl}/certificate/verify/${id}`;


        // Add the background image
        doc.image('assets/cert4.png', 0, 0, {width: doc.page.width, height: doc.page.height});

        // Header: County Government, Department of Health
        doc.font('fonts/Cardo-Bold.ttf').fontSize(18).fill('#021c27')
            .text("COUNTY GOVERNMENT OF VIHIGA", margin, margin + 20, {
                width: doc.page.width - 2 * margin,
                align: 'center'
            });

        doc.font('fonts/Cardo-Bold.ttf').fontSize(13).fill('#021c27')
            .text("DEPARTMENT OF HEALTH", margin, margin + 45, {width: doc.page.width - 2 * margin, align: 'center'});


        doc.image('assets/logo.png', logoX, logoY, {width: logoWidth, height: logoHeight});


        // Left-aligned text block
        doc.font('fonts/Cardo-Italic.ttf').fontSize(8).fill('#021c27')
            .text("E-mail: info@vihigahospital.go.ke\nMobile No: +254-723103564\nOffice No: +254-773223151", leftTextX, logoY, {
                width: textBlockWidth,
                align: 'right'
            });

        // Right-aligned text block
        doc.font('fonts/Cardo-Italic.ttf').fontSize(7).fill('#021c27')
            .text(`Office of the Medical Superintendent\n${facilityName}\nP.O. Box 1069 – 50300 Maragoli.\n${createdAt}`, rightTextX, logoY, {
                width: textBlockWidth,
                align: 'left'
            });

        // Place the 'CERTIFICATE' text
        doc.font('fonts/CinzelDecorative-Bold.ttf').fontSize(14).fill('#021c27')
            .text('CERTIFICATE OF COMPLETION', margin, margin + 140, {
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


        details.forEach(([label, value]) => {
            // Draw the label left-aligned within its designated space
            doc.font('fonts/Fraunces_72pt-Regular.ttf').fontSize(8).fill('#021c27')
                .text(`${label}:`, leftColumnStart, boxY, {width: labelWidth, align: 'left'});
            // Draw the value left-aligned within its designated space
            doc.font('fonts/Fraunces_72pt-Regular.ttf').fontSize(8).fill('#021c27')
                .text(value, leftColumnStart + labelWidth, boxY, {width: valueWidth, align: 'left'});
            boxY += 12; // Increment Y position for the next row
        });

        boxY += 15; // Gap before the statement
        const cleanDefectsText = defectsText.replace(/\n/g, ' ');

        doc.font('fonts/Cardo-Regular.ttf').fontSize(9).fill('#021c27')
            .text(cleanDefectsText, statementX, boxY, {
                width: statementWidth,
                align: 'center'
            });

        boxY += 30; // Ensure enough space after the statement


        const signatures = [
            {title: "Project Manager", name: projectManager},
            {title: "Facility In-charge", name: facilityIncharge},
            {title: "Contractor", name: contractor},
            {title: "Project Supervisor", name: projectSupervisor},
        ];


        // Generate QR Code and place in the center


        const qrCodeURL = await QRCode.toDataURL(link);
        doc.image(qrCodeURL, qrCodePosition, boxY, {fit: [qrCodeSize, qrCodeSize]});

        doc.font('fonts/NotoSerif_Condensed-Bold.ttf').fontSize(6).fill('#021c27')
            .text(`SN: ${serialNumber}`, qrCodePosition + 14, boxY + qrCodeSize + 1);

        const labelX = leftColumnStart;
        const valueX = leftColumnStart + doc.widthOfString('Name: ')  // Start the name right after the label

        // Place signatures on the left
        signatures.slice(0, 2).forEach(({title, name}, idx) => {
            const yPosition = boxY + (idx * signatureSpacing); // Position each signature block with defined spacing

            // Print title, name, and signature in order
            doc.font('fonts/NotoSerif_Condensed-Bold.ttf').fontSize(8).fill('#021c27')
                .text(title, leftColumnStart, yPosition);
            // Print the "Name" label
            doc.font('fonts/NotoSerif_Condensed-Regular.ttf').fontSize(8).fill('#021c27')
                .text('Name: ', labelX, yPosition + 15);
            // Print the name value
            doc.font('fonts/Italianno-Regular.ttf').fontSize(13).fill('#021c27')
                .text(name, valueX +  2, yPosition + 13);
            doc.font('fonts/NotoSerif_Condensed-Regular.ttf').fontSize(8).fill('#021c27')
                .text(`Sign: `, leftColumnStart, yPosition + 28);
        });

// Place signatures on the right
        signatures.slice(2, 4).forEach(({title, name}, idx) => {
            const yPosition = boxY + (idx * signatureSpacing); // Position each signature block with defined spacing

            // Print title in order
            doc.font('fonts/NotoSerif_Condensed-Bold.ttf').fontSize(8).fill('#021c27')
                .text(title, rightColumnStart, yPosition);

            // Print the "Name" label
            doc.font('fonts/NotoSerif_Condensed-Regular.ttf').fontSize(8).fill('#021c27')
                .text('Name: ', rightColumnStart, yPosition + 15);

            // Calculate the X position for the name value to align properly
            const labelX = rightColumnStart;
            const valueX = rightColumnStart + doc.widthOfString('Name: '); // Start the name right after the label

            // Print the name value using a different font
            doc.font('fonts/Italianno-Regular.ttf').fontSize(13).fill('#021c27')
                .text(name, valueX, yPosition + 13);

            // Print signature label
            doc.font('fonts/NotoSerif_Condensed-Regular.ttf').fontSize(8).fill('#021c27')
                .text(`Sign: `, rightColumnStart, yPosition + 28);
        });


        doc.end();


    } catch (err) {
        console.log(err);
        res.status(500).json({error: errorHandler(err)});
    }
};


