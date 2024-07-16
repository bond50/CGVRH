// controllers/seo.js
const SEO = require('../models/seo');
const {errorHandler} = require('../helpers/dbErrorHandler');
const {replacePlaceholders} = require("../helpers/replacePlaceHolders");


const APP_NAME = process.env.APP_NAME;
const DOMAIN = process.env.DOMAIN
const CLIENT_URL = process.env.CLIENT_URL

const replacements = {APP_NAME, DOMAIN, CLIENT_URL};



// Create SEO Data
exports.createSEO = async (req, res) => {
    const {
        page,
        title,
        description,
        keywords,
        author,
        twitterHandle,
        imageUrl,
        structuredData,
        locale,
        themeColor
    } = req.body;


    try {
        let existingSEO = await SEO.findOne({page});
        if (existingSEO) {
            return res.status(400).json({message: 'SEO setting for this page already exists'});
        }

        const seo = new SEO({
            page,
            title: replacePlaceholders(title, replacements),
            description: replacePlaceholders(description, replacements),
            keywords: replacePlaceholders(keywords, replacements),
            author: replacePlaceholders(author, replacements),
            twitterHandle,
            imageUrl,
            structuredData: typeof structuredData === 'string' ? JSON.parse(structuredData) : structuredData, // Ensure structuredData is parsed as JSON
            locale,
            themeColor
        });

        await seo.save();
        res.json({message: 'SEO setting created successfully'});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({error: errorHandler(error)});
    }
};

// Update SEO Data
exports.updateSEO = async (req, res) => {
    const {
        title,
        page,
        description,
        keywords,
        author,
        twitterHandle,
        imageUrl,
        structuredData,
        locale,
        themeColor
    } = req.body;


    try {
        let seo = await SEO.findOne({page});
        if (!seo) {
            console.log('SEO setting not found for page ID:', req.params.pageId);
            return res.status(404).json({message: 'SEO setting for this page not found'});
        }

        const replaceTitle = replacePlaceholders(title, replacements)


        await SEO.findOneAndUpdate(
            {page: page},
            {
                title: replaceTitle,
                description: replacePlaceholders(description, replacements),
                keywords: replacePlaceholders(keywords, replacements),
                author: replacePlaceholders(author, replacements),
                twitterHandle,
                imageUrl,
                structuredData: typeof structuredData === 'string' ? JSON.parse(structuredData) : structuredData, // Ensure structuredData is parsed as JSON
                locale,
                themeColor
            },
            {new: true}
        );


        res.json({message: 'SEO setting updated successfully'});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({error: errorHandler(error)});
    }
};

// Get SEO data for a specific page
exports.getSEO = async (req, res) => {

    try {
        const seo = await SEO.findOne({page: req.params.pageId}).populate('page');
        if (!seo) {
            return res.status(404).json({error: 'SEO data not found for the specified page ID.'});
        }
        res.json(seo);
    } catch (error) {
        res.status(500).json({error: 'An error occurred while retrieving the SEO data.'});
    }
};

// Get all SEO settings
exports.getAllSEOs = async (req, res) => {
    try {
        const seos = await SEO.find().populate('page');
        res.json(seos);
    } catch (error) {
        res.status(500).json({error: 'An error occurred while retrieving the SEO settings.'});
    }
};

// Delete SEO data
exports.deleteSEO = async (req, res) => {
    try {
        const seo = await SEO.findByIdAndRemove(req.params.id);
        if (!seo) {
            return res.status(404).json({error: 'SEO setting not found'});
        }
        res.json({message: 'SEO setting deleted successfully'});
    } catch (error) {
        res.status(500).json({error: 'An error occurred while deleting the SEO setting.'});
    }
};

exports.getSEOById = async (req, res) => {
    try {
        const seo = await SEO.findById(req.params.id).populate('page');
        if (!seo) {
            return res.status(404).json({error: 'SEO data not found for the specified ID.'});
        }
        res.json(seo);
    } catch (error) {
        res.status(500).json({error: 'An error occurred while retrieving the SEO data.'});
    }
};

