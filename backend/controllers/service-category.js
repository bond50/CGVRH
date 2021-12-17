const slugify = require("slugify");
const ServiceCategory = require("../models/serviceCategory");
const {errorHandler} = require("../helpers/dbErrorHandler");

const Services = require("../models/services");


exports.create = (req, res) => {
    const {name} = req.body
    let slug = slugify(name).toLowerCase()
    let category = new ServiceCategory({name, slug})
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })

        }
        res.json(data)
    })
};

exports.list = (req, res) => {
    ServiceCategory.find({}).exec((err, data) => {
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

    ServiceCategory.findOne({ slug }).exec((err, category) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        Services.find({ categories: category })
            .populate('categories', '_id name slug')
            .populate('tags', '_id  name slug')
            .populate('postedBy', '_id name username')
            .select('_id title slug excerpt categories postedBy tags createdAt updatedAt')
            .exec((err, data) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                }
                res.json({ category: category, services: data });
            });
    });
};

exports.remove = (req, res) => {
    const slug = req.params.slug.toLowerCase();

    ServiceCategory.findOneAndRemove({slug}).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: 'BlogCategory deleted successfully'
        });
    });
};