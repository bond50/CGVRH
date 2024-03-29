const slugify = require("slugify");
const ServiceTag = require("../models/serviceTag");
const {errorHandler} = require("../helpers/dbErrorHandler");

const Services = require("../models/pages");


exports.create = (req, res) => {
    const {name} = req.body;
    let slug = slugify(name).toLowerCase();

    let tag = new ServiceTag({name, slug});

    tag.save((err, data) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data); // dont do this res.json({ tag: data });
    });
};

exports.list = (req, res) => {
    ServiceTag.find({}).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.read = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    ServiceTag.findOne({slug}).exec((err, tag) => {
        if (err) {
            return res.status(400).json({
                error: 'BlogTag not found'
            });
        }
        // res.json(tag);
        Services.find({tags: tag})
            .populate('categories', '_id name slug')
            .populate('tags', '_id name  slug')
            .populate('postedBy', '_id name username')
            .select('_id title slug excerpt categories postedBy tags createdAt updatedAt')
            .exec((err, data) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                }
                res.json({tag: tag, services: data});
            });
    });
};

exports.remove = (req, res) => {
    const slug = req.params.slug.toLowerCase();

    ServiceTag.findOneAndRemove({slug}).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: 'BlogTag deleted successfully'
        });
    });
};