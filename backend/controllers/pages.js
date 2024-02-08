const Page = require('../models/pages');
const Category = require('../models/pageCategory');
const slugify = require('slugify');
const stripHtml = require('string-strip-html');
const _ = require('lodash');
const {errorHandler} = require('../helpers/dbErrorHandler');
const fs = require('fs');
const {smartTrim} = require('../helpers/blog');
const User = require("../models/user");
const {capitalizeFirstLetter} = require("../helpers/importantFunctions");


exports.create = (req, res) => {
    const {title, body, categories, images} = req.body

    if (!title || !title.length) {
        return res.status(400).json({
            error: 'title is required'
        });
    }

    if (!categories || categories.length === 0) {
        return res.status(400).json({
            error: 'At least one category is required'
        });
    }


    let page = new Page();
    page.title = title.toLowerCase();
    page.body = body;
    page.excerpt = smartTrim(body, 320, ' ', ' ...');
    page.slug = slugify(title).toLowerCase();
    page.metaTitle = `${title} | ${process.env.APP_NAME}`;
    page.metaDesc = stripHtml(body.substring(0, 160));
    page.postedBy = req.auth._id;
    page.images = images;


    page.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        Page.findByIdAndUpdate(result._id, {$push: {categories}}, {new: true}).exec(
            (err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                } else {
                    res.json(result);
                }
            }
        );
    });
}

exports.listFeatured = (req, res) => {
    Page.find({featured: true, accepted: true})
        .select('_id title images excerpt slug')
        .sort({updatedAt: -1})
        .limit(4)
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            res.json(data);
        });
}
exports.list = (req, res) => {
    Page.find({accepted: true})
        .populate('categories', '_id name slug')
        .populate('postedBy', '_id name username')
        .select('_id title slug images metaTitle metaDesc excerpt categories postedBy createdAt updatedAt')
        .sort({updatedAt: -1})
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            res.json(data);
        });
};


exports.listWithPagination = async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 6;

    try {
        const totalCount = await Page.countDocuments({accepted: true}).exec();
        const data = await Page.find({accepted: true})
            .populate('categories', '_id name slug')
            .populate('postedBy', '_id name username')
            .select('_id title slug metaTitle metaDesc excerpt createdAt updatedAt')
            .sort({updatedAt: -1})
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .exec();

        res.json({
            data,
            totalCount,

        });
    } catch (err) {
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};

exports.listAllServicesCategoriesTags = (req, res) => {
    let pages;
    let categories;
    let tags;

    Page.find({})
        .populate('categories', '_id name slug')
        .populate('postedBy', '_id name username profile')
        .sort({updatedAt: -1})
        .select('_id title slug excerpt metaTitle metaDesc images categories postedBy createdAt updatedAt')
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            pages = data;
            // get all categories
            Category.find({}).exec((err, c) => {
                if (err) {
                    return res.json({
                        error: errorHandler(err)
                    });
                }
                categories = c; // categories

                res.json({pages, categories, size: pages.length});
            });
        });
};

exports.listAllSlugs = async (req, res) => {
    try {
        // Find all pages with accepted flag set to true, select only the 'slug' field,
        // and sort by updatedAt date in descending order
        const data = await Page.find({accepted: true})
            .select('slug')
            .sort({updatedAt: -1})
            .exec();

        // Extract slugs from the data array
        const slugs = data.map(page => page.slug);

        // Return slugs and size as JSON response
        res.json({slugs, size: slugs.length});
    } catch (error) {
        // Handle errors
        res.status(500).json({error: errorHandler(error)});
    }
};

exports.photo = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    Page.findOne({slug})
        .select('photo')
        .exec((err, service) => {
            if (err || !service) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.set('Content-Type', service.photo.contentType);
            return res.send(service.photo.data);
        });
};


exports.read = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    Page.findOne({slug})
        // .select("-photo")
        .populate('categories', '_id name slug')
        .populate('postedBy', '_id name username')
        .select('_id title body accepted images featured excerpt slug metaTitle metaDesc categories tags postedBy createdAt updatedAt')
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            res.json(data);
        });
};


exports.listServiceNamesAndSlugs = (req, res) => {
    Page.find({})
        .sort({updatedAt: -1})
        .select('_id title slug')
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            res.json(data);
        });
};


exports.listRelated = (req, res) => {
    let limit = req.body.limit ? parseInt(req.body.limit) : 30;
    const {categories} = req.body.service;


    Page.find({categories: {$in: categories}})
        .limit(limit)
        .select('title slug')
        .sort({updatedAt: -1})
        .exec((err, blogs) => {
            if (err) {
                return res.status(400).json({
                    error: 'Services not found'
                });
            }
            res.json(blogs);
        });
};


exports.remove = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    Page.findOneAndRemove({slug}).exec((err, data) => {
        if (err) {
            return res.json({
                error: errorHandler(err)
            });
        }
        data.photo = undefined
        console.log(data)
        res.json({
            message: `${capitalizeFirstLetter(data.title)} page deleted successfully`
        });
    });
};


exports.update = async (req, res) => {
    try {
        const slug = req.params.slug.toLowerCase();
        req.body.excerpt = smartTrim(req.body.body, 320, ' ', ' ...');
        const updated = await Page.findOneAndUpdate({slug}, req.body, {new: true}).exec()
        if (req.body.images.length > 0) {
            await Page.findOneAndUpdate({slug}, {$unset: {photo: {}}}, {new: true}).exec()
        }
        res.json(updated)

    } catch (err) {
        res.status(400).send({error: err.message})
    }


};

exports.listPending = (req, res) => {
    Page.find({accepted: false})
        .populate('postedBy', '_id name username')
        .select('_id title accepted slug postedBy createdAt updatedAt')
        .sort({updatedAt: -1})
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            res.json(data);
        });
};


exports.listByUser = (req, res) => {
    User.findOne({username: req.params.username}).exec(
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            Page.find({postedBy: user._id, accepted: true})
                .populate('categories', '_id name slug')
                .populate('postedBy', '_id name username')
                .select('_id title images accepted slug postedBy createdAt updatedAt')
                .sort({updatedAt: -1})
                .exec((err1, data) => {
                    if (err) {
                        return res.status(400).json({
                            error: errorHandler(err)
                        });
                    }
                    res.json(data)
                })

        })
}
exports.listPendingByUser = (req, res) => {
    User.findOne({username: req.params.username}).exec(
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            Page.find({postedBy: user._id, accepted: false})
                .populate('categories', '_id name slug')
                .populate('postedBy', '_id name username')
                .select('_id title accepted slug postedBy createdAt updatedAt')
                .sort({updatedAt: -1})

                .exec((err1, data) => {
                    if (err) {
                        return res.status(400).json({
                            error: errorHandler(err)
                        });
                    }
                    res.json(data)
                })

        })
}
