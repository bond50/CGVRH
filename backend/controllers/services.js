const Service = require('../models/services');
const Category = require('../models/serviceCategory');
const Tag = require('../models/serviceTag');
const formidable = require('formidable');
const slugify = require('slugify');
const stripHtml = require('string-strip-html');
const _ = require('lodash');
const {errorHandler} = require('../helpers/dbErrorHandler');
const fs = require('fs');
const {smartTrim} = require('../helpers/blog');
const Blog = require("../models/blog");


exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not upload'
            });
        }
        const {title, body, categories, tags, featured} = fields;


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


        if (!tags || tags.length === 0) {
            return res.status(400).json({
                error: 'At least one tag is required'
            });
        }
         if (!tags || tags.length === 0) {
            return res.status(400).json({
                error: 'At least one tag is required'
            });
        }



        let service = new Service();
        service.title = title.toLowerCase();
        service.body = body;
        service.isFeatured = featured;
        service.excerpt = smartTrim(body, 320, ' ', ' ...');
        service.slug = slugify(title).toLowerCase();
        service.metaTitle = `${title} | ${process.env.APP_NAME}`;
        service.metaDesc = stripHtml(body.substring(0, 160));
        service.postedBy = req.auth._id;
        let arrayOfCategories = categories && categories.split(',');
        let arrayOfTags = tags && tags.split(',');

        if (files.photo) {
            if (files.photo.size > 10000000) {
                return res.status(400).json({
                    error: 'Image should be less then 1mb in size'
                });
            }
            service.photo.data = fs.readFileSync(files.photo.path);
            service.photo.contentType = files.photo.type;
        }


        service.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            Service.findByIdAndUpdate(result._id, {$push: {categories: arrayOfCategories}}, {new: true}).exec(
                (err, result) => {
                    if (err) {
                        return res.status(400).json({
                            error: errorHandler(err)
                        });
                    } else {
                        Service.findByIdAndUpdate(result._id, {$push: {tags: arrayOfTags}}, {new: true}).exec(
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
                    }
                }
            );
        });
    })
}
exports.listFeaturedServices = (req, res) => {
    Service.find({isFeatured: true})
        .select('_id title excerpt slug')
        .sort({createdAt: -1})
        .limit(6)
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
    Service.find({})
        .populate('categories', '_id name slug')
        .populate('tags', '_id name slug')
        .populate('postedBy', '_id name username')
        .select('_id title slug excerpt categories tags postedBy createdAt updatedAt')
        .sort({createdAt: -1})
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            res.json(data);
        });
};


exports.listAllServicesCategoriesTags = (req, res) => {
    let services;
    let categories;
    let tags;

    Service.find({})
        .populate('categories', '_id name slug')
        .populate('tags', '_id name slug')
        .populate('postedBy', '_id name username profile')
        .sort({createdAt: -1})
        .select('_id title slug excerpt  categories tags postedBy createdAt updatedAt')
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            services = data;
            // get all categories
            Category.find({}).exec((err, c) => {
                if (err) {
                    return res.json({
                        error: errorHandler(err)
                    });
                }
                categories = c; // categories
                // get all tags
                Tag.find({}).exec((err, t) => {
                    if (err) {
                        return res.json({
                            error: errorHandler(err)
                        });
                    }
                    tags = t;
                    // return all blogs categories tags
                    res.json({services, categories, tags, size: services.length});
                });
            });
        });
};


exports.photo = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    Service.findOne({slug})
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
    Service.findOne({slug})
        // .select("-photo")
        .populate('categories', '_id name slug')
        .populate('tags', '_id name slug')
        .populate('postedBy', '_id name username')
        .select('_id title body excerpt slug mtitle mdesc categories tags postedBy createdAt updatedAt')
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
    Service.find({})
        .sort({createdAt: -1})
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
    let limit = req.body.limit ? parseInt(req.body.limit) : 3;
    const {_id, categories} = req.body.service;

    Service.find({_id: {$ne: _id}, categories: {$in: categories}})
        .limit(limit)
        .populate('postedBy', '_id name  username profile')
        .select('title slug excerpt postedBy createdAt updatedAt')
        .exec((err, blogs) => {
            if (err) {
                return res.status(400).json({
                    error: 'Services not found'
                });
            }
            res.json(blogs);
        });
};