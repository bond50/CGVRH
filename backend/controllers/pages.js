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
const SEO = require('../models/seo');


exports.create = async (req, res) => {
    try {
        const {title, body, categories, images} = req.body;

        if (!title || !title.length) {
            return res.status(400).json({error: 'Title is required'});
        }

        if (!categories || categories.length === 0) {
            return res.status(400).json({error: 'At least one category is required'});
        }

        let page = new Page({
            title: title.toLowerCase(),
            body,
            excerpt: smartTrim(body, 320, ' ', ' ...'),
            slug: slugify(title).toLowerCase(),
            metaTitle: `${title} | ${process.env.APP_NAME}`,
            metaDesc: stripHtml(body.substring(0, 160)),
            postedBy: req.auth._id,
            images
        });

        let result = await page.save();
        result = await Page.findByIdAndUpdate(result._id, {$push: {categories}}, {new: true}).exec();

        res.json(result);
    } catch (err) {
        return res.status(400).json({error: errorHandler(err)});
    }
};

exports.listFeatured = async (req, res) => {
    try {
        const data = await Page.find({featured: true, accepted: true})
            .select('_id title images excerpt slug')
            .sort({updatedAt: -1})
            .limit(4)
            .exec();

        res.json(data);
    } catch (err) {
        return res.json({error: errorHandler(err)});
    }
};

exports.list = async (req, res) => {
    try {


        const data = await Page.find({accepted: true})
            .populate('categories', '_id name slug')
            .populate('postedBy', '_id name username')
            .select('_id title slug images metaTitle metaDesc excerpt categories postedBy createdAt updatedAt')
            .sort({updatedAt: -1})
            .exec();

        res.json(data);
    } catch (err) {
        return res.json({error: errorHandler(err)});
    }
};


exports.listWithPagination = async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 6;

    try {
        const seoSettings = await SEO.find({page: '6681769e879d792ab67edfdb'}).populate("page").exec();


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
            seoSettings


        });
    } catch (err) {
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};

exports.listAllServicesCategoriesTags = async (req, res) => {
    try {
        const pages = await Page.find({accepted: true})
            .populate('categories', '_id name slug')
            .populate('postedBy', '_id name username profile')
            .sort({updatedAt: -1})
            .select('_id title slug excerpt metaTitle metaDesc images categories postedBy createdAt updatedAt')
            .exec();

        const categories = await Category.find({}).exec();

        res.json({pages, categories, size: pages.length});
    } catch (err) {
        return res.json({error: errorHandler(err)});
    }
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


    Page.find({categories: {$in: categories},accepted: true})
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

exports.listSEOSettings = async (req, res) => {
    const seoSettings = await SEO.find({page: '6696537c9670825168aef3b7'}).populate("page").exec();
    res.json(seoSettings);
}

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
