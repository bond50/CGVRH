const slugify = require("slugify");
const PageCategory = require("../models/pageCategory");
const {errorHandler} = require("../helpers/dbErrorHandler");
const Pages = require("../models/pages");


exports.create = (req, res) => {
    console.log('created')
    const {name} = req.body
    let slug = slugify(name).toLowerCase()
    let category = new PageCategory({name, slug})
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
    PageCategory.find({}).exec((err, data) => {
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
    PageCategory.findOne({slug}).exec((err, category) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }


        Pages.find({categories: category})
            .populate('categories', '_id name slug')
            .populate('postedBy', '_id name username')
            .select('_id title slug excerpt categories postedBy  createdAt updatedAt')
            .exec((err, data) => {
                if (err) return res.status(400).json({
                    error: errorHandler(err)
                });
                res.json({category: category, pages: data});
            });
    });
};
exports.readCatNames = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    PageCategory.findOne({slug}).exec((err, category) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        Pages.find({categories: category, accepted: true})
            .select('_id title slug')
            .exec((err, data) => {
                if (err) return res.status(400).json({
                    error: errorHandler(err)
                });
                res.json({category: category, pages: data});
            });
    });
};

exports.remove = (req, res) => {
    const slug = req.params.slug.toLowerCase();

    PageCategory.findOneAndRemove({slug}).exec((err, data) => {
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