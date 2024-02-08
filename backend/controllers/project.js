// Import necessary modules
const Project = require('../models/project');
const slugify = require('slugify');
const stripHtml = require('string-strip-html');
const {smartTrim} = require('../helpers/blog');
const cloudinary = require("cloudinary");
const {errorHandler} = require("../helpers/dbErrorHandler");

exports.create = async (req, res) => {
    try {
        // Extract project details from request body
        let {title, description, body, progress, images} = req.body;
        const excerpt = smartTrim(body, 320, ' ', ' ...');
        const slug = slugify(title).toLowerCase();
        const metaTitle = `${title} | ${process.env.APP_NAME}`;
        const metaDesc = stripHtml(body.substring(0, 160));
        const postedBy = req.auth._id;

        // Create a new project instance
        const project = new Project({
            title,
            description,
            body,
            slug,
            excerpt,
            progress,
            metaTitle,
            metaDesc,
            postedBy,
            images
        });

        // Save the project to the database
        const data = await project.save();
        res.json({message: 'Project added successfully'});
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
};

// Controller function to list all projects
exports.list = async (req, res) => {
    try {
        // Find all projects in the database
        const data = await Project.find().exec();
        res.json(data);
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
};




exports.read = async (req, res) => {
    try {
        const {slug} = req.params;
        // Find the project by slug
        const data = await Project.findOne({slug}).exec();
        res.json(data);
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
};


exports.update = async (req, res) => {
    try {
        const { slug } = req.params;

        // Extract project details from request body
        let { title, description, body, progress, images } = req.body;
        const excerpt = smartTrim(body, 320, ' ', ' ...');
        const metaTitle = `${title} | ${process.env.APP_NAME}`;
        const metaDesc = stripHtml(body.substring(0, 160));

        // Find the project by slug and update its details
        const data = await Project.findOneAndUpdate({ slug }, { title, description, body, progress, excerpt, metaTitle, metaDesc, images }, { new: true }).exec();
        res.json({ message: 'Successfully updated' });
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
};

exports.remove = async (req, res) => {
    try {
        const { slug } = req.params;

        // Find the project by slug and remove it from the database
        const project = await Project.findOneAndRemove({ slug }).exec();


        if (project.images.length > 0) {
            for (const image of project.images) {
                await cloudinary.uploader.destroy(image.public_id);
            }
        }

        res.json({
            message: "Project deleted successfully"
        });
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
};
exports.listAllSlugs = async (req, res) => {
    try {

        const data = await Project.find({accepted: true})
            .select('slug')
            .sort({updatedAt: -1})
            .exec();

        // Extract slugs from the data array
        const slugs = data.map(page => page.slug);

        res.json(slugs);
    } catch (error) {
        // Handle errors
        res.status(500).json({error: errorHandler(error)});
    }
};