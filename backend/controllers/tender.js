const {cloudinaryUpload} = require("../helpers/cloudinary");
const Tender = require("../models/tender");
const {fileSizeFormatter} = require("../helpers/fileSizeFormatter");
const fs = require("fs");
const SEO = require("../models/seo");

const cloudinary = require('cloudinary').v2
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


exports.createTenders = async (req, res) => {
    try {
        const file = req.file;
        const {title, folder = 'Tenders', openDate, closeDate, tenderNumber} = req.body;

        const uppercasedTender = title.toUpperCase()
        const uppercasedTenderNumber = tenderNumber.toUpperCase()
        // Check if required fields are provided
        if (!title || !tenderNumber || !openDate || !closeDate || !file) {
            return res.status(400).json({
                error: "All fields are required",
            });
        }

        const {path, originalname, mimetype, size} = file;
        console.log('Saving to cloudinary')
        const result = await cloudinaryUpload(path, folder);

        const tender = new Tender({
            filePath: result.filePath,
            title: uppercasedTender,
            openDate,
            closeDate,
            tenderNumber: uppercasedTenderNumber,
            cloudinaryFolder: folder,
            publicId: result.publicId,
            fileName: originalname,
            fileType: mimetype,
            fileSize: fileSizeFormatter(size, 2),
            uploadedBy: req.auth._id,
        });

        // Save the tender data to the database
        const savedTender = await tender.save();
        console.log('Saved to db successfully')

        // Delete the uploaded file from the "uploads" folder
        fs.unlinkSync(path);
        console.log('File removed from server')

        res.status(200).json({
            success: true,
            successMessage: "Tender uploaded successfully",
            data: savedTender,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "An error occurred while uploading the tender.",
        });
    }
};

exports.fetchTenders = async (req, res) => {

    try {
        const tenders = await Tender.find({})
            .sort({createdAt: -1}) // Sort by createdAt in descending order
            .exec();

        res.status(200).json(tenders);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Error while fetching tenders."});
    }
};

exports.fetchPublicTenders = async (req, res) => {
    try {
        const seoSettings = await SEO.find({page: '6696654914be5a83aa6b0592'}).populate("page").exec();

        const tenders = await Tender.find({isHidden: false}) // Filter for non-hidden tenders
            .sort({createdAt: -1}) // Sort by createdAt in descending order
            .exec();

        res.status(200).json({tenders, seoSettings});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Error while fetching tenders."});
    }
};


exports.updateTenders = async (req, res) => {
    try {
        const {tenderId} = req.params;
        const updateData = req.body;
        const file = req.file;

        // Find the existing tender by ID
        const existingTender = await Tender.findById(tenderId);

        if (!existingTender) {
            return res.status(404).json({error: "Tender not found"});
        }

        // Check if req.file exists
        if (file) {
            const {path} = file;

            // Delete the existing file from Cloudinary using its publicId
            if (existingTender.publicId) {
                const cloudinaryResponse = await cloudinary.uploader.destroy(existingTender.publicId);
                if (cloudinaryResponse.result !== 'ok') {
                    console.error(cloudinaryResponse.error.message);
                    return res.status(500).json({error: "Error while deleting the file from Cloudinary."});
                }
            }

            // Perform the Cloudinary upload for the new file
            const result = await cloudinaryUpload(path, 'Tenders');

            // Update fields related to the new file
            if (result) {
                updateData.filePath = result.filePath;
                updateData.publicId = result.publicId;
                updateData.fileName = file.originalname;
                updateData.fileType = file.mimetype;
                updateData.fileSize = fileSizeFormatter(file.size, 2);
            }

            // Delete the uploaded file from the "uploads" folder
            fs.unlinkSync(path);
        }

        if (updateData.title) {
            updateData.title = updateData.title.toUpperCase();
        }
        if (updateData.tenderNumber) {
            updateData.tenderNumber = updateData.tenderNumber.toUpperCase();
        }

        // Update the tender with the new data
        const updatedTender = await existingTender.updateOne(updateData);

        res.status(200).json({
            success: true,
            successMessage: "Tender updated successfully",
            data: updatedTender,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Error while updating the tender."});
    }
};


exports.deleteTenders = async (req, res) => {
    try {
        const {tenderId} = req.params;

        // Find the tender by ID
        const tender = await Tender.findById(tenderId);

        if (!tender) {
            return res.status(404).json({error: "Tender not found"});
        }

        // Extract the publicId from the tender document
        const publicId = tender.publicId;

        console.log(publicId);

        // Delete the file from Cloudinary using the publicId
        const cloudinaryResponse = await cloudinary.uploader.destroy(publicId);

        if (cloudinaryResponse.result === 'ok') {
            // File successfully deleted from Cloudinary
            // Now, delete the tender from the database
            await tender.remove();

            res.status(200).json({success: true, message: "Tender deleted successfully"});
        } else {
            console.error(cloudinaryResponse.error.message);
            return res.status(500).json({error: "Error while deleting the file from Cloudinary."});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Error while processing the request."});
    }
};

exports.fetchSingleTender = async (req, res) => {
    try {
        const {tenderId} = req.params;

        // Find the tender by its ID
        const tender = await Tender.findById(tenderId);

        if (!tender) {
            return res.status(404).json({error: "Tender not found"});
        }
        res.status(200).json(tender);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Error while fetching the single tender."});
    }
};
