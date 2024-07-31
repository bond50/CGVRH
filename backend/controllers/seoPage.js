const SEOPage = require('../models/seoPage');

// Get all SEO Pages
exports.getAllSEOPages = async (req, res) => {

    try {
        const pages = await SEOPage.find();
        res.json(pages);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Create a new SEO Page
exports.createSEOPage = async (req, res) => {



    const { name, url } = req.body;


    try {
        const page = new SEOPage({ name, url });
        await page.save();
        res.json(page);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Server error' });
    }
};

// Update an existing SEO Page
exports.updateSEOPage = async (req, res) => {
    const { name, url } = req.body;
    try {
        const page = await SEOPage.findByIdAndUpdate(req.params.id, { name, url }, { new: true });
        res.json({message: 'Page updated successfully'});
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete an SEO Page
exports.deleteSEOPage = async (req, res) => {
    try {
        await SEOPage.findByIdAndDelete(req.params.id);
        res.json({ message: 'SEO Page deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get an SEO Page by ID
exports.getSEOPageById = async (req, res) => {
    try {
        const page = await SEOPage.findById(req.params.id);
        res.json(page);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
