const Page = require("../models/pages");
const Blog = require("../models/blog");
const Project = require("../models/project");
const {errorHandler} = require("../helpers/dbErrorHandler");

exports.listFeatured = async (req, res) => {

    try {
        // Define conditions for each model
        const pageCondition = {featured: true, accepted: true};
        const blogCondition = {featured: true, accepted: true};
        const projectCondition = {featured: true, accepted: true};

        // Search for featured items in all models
        const [pageData, blogData, projectData] = await Promise.all([
            Page.find(pageCondition).select('_id title images excerpt slug').limit(4),
            Blog.find(blogCondition).select('_id title images excerpt slug').limit(4),
            Project.find(projectCondition).select('_id title images excerpt slug').limit(4)
        ]);

        // Concatenate data from all models
        let allData = [...pageData, ...blogData, ...projectData];

        // Sort all data by updatedAt in descending order
        allData.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

        // Limit to 12 items
        const limitedData = allData.slice(0, 12);

        // Add a field indicating the source of the data dynamically
        const modifiedData = limitedData.map(item => {
            let newItem = {...item};
            if (pageData.includes(item)) {
                newItem.dataFrom = 'services';
            }
            if (blogData.includes(item)) {
                newItem.dataFrom = 'blogs';
            }
            if (projectData.includes(item)) {
                newItem.dataFrom = 'projects';
            }
            return newItem;
        });

        // Prepare data for sending to frontend
        const cleanedData = modifiedData.map(item => ({
            _id: item._doc._id,
            title: item._doc.title,
            images: item._doc.images,
            excerpt: item._doc.excerpt,
            slug: item._doc.slug,
            dataFrom: item.dataFrom
        }));

        console.log(cleanedData);
        res.json(cleanedData);

    } catch (err) {
        res.json({error: errorHandler(err)});
    }
};
