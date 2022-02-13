const Page = require('../models/pages');
const Category = require('../models/pageCategory');
const formidable = require('formidable');
const slugify = require('slugify');
const stripHtml = require('string-strip-html');
const _ = require('lodash');
const {errorHandler} = require('../helpers/dbErrorHandler');
const fs = require('fs');
const {smartTrim} = require('../helpers/blog');


exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not upload'
            });
        }
        const {title, body, categories} = fields;


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
        let arrayOfCategories = categories && categories.split(',');


        if (files.photo) {
            if (files.photo.size > 2000000) {
                return res.status(400).json({
                    error: 'Image should be less then 2 mb in size'
                });
            }
            page.photo.data = fs.readFileSync(files.photo.path);
            page.photo.contentType = files.photo.type;
        }


        page.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            Page.findByIdAndUpdate(result._id, {$push: {categories: arrayOfCategories}}, {new: true}).exec(
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
    })
}
exports.listFeatured = (req, res) => {
    Page.find({featured: true, accepted: true})
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

    Page.find({accepted: true})
        .populate('categories', '_id name slug')
        .populate('postedBy', '_id name username')
        .select('_id title slug excerpt categories  postedBy createdAt updatedAt')
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
    let pages;
    let categories;
    let tags;

    Page.find({})
        .populate('categories', '_id name slug')
        .populate('postedBy', '_id name username profile')
        .sort({createdAt: -1})
        .select('_id title slug excerpt  categories postedBy createdAt updatedAt')
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
        .select('_id title body accepted featured excerpt slug mtitle mdesc categories tags postedBy createdAt updatedAt')
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
    let limit = req.body.limit ? parseInt(req.body.limit) : 30;
    const {categories} = req.body.service;


    Page.find({categories: {$in: categories}})
        .limit(limit)
        .select('title slug')
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
        res.json({
            message: `${slug} deleted successfully`
        });
    });
};

exports.update = (req, res) => {

    const slug = req.params.slug.toLowerCase();

    Page.findOne({slug}).exec((err, oldPage) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        let form = new formidable.IncomingForm();
        form.keepExtensions = true;

        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.status(400).json({
                    error: 'Image could not upload'
                });
            }


            let slugBeforeMerge = oldPage.slug;
            oldPage = _.merge(oldPage, fields);
            oldPage.slug = slugBeforeMerge;

            const {body, desc, categories, tags} = fields;

            if (body) {
                oldPage.excerpt = smartTrim(body, 320, ' ', ' ...');
                oldPage.desc = stripHtml(body.substring(0, 160));
            }

            if (categories) {
                oldPage.categories = categories.split(',');
            }


            if (files.photo) {
                if (files.photo.size > 10000000) {
                    return res.status(400).json({
                        error: 'Image should be less then 1mb in size'
                    });
                }
                oldPage.photo.data = fs.readFileSync(files.photo.path);
                oldPage.photo.contentType = files.photo.type;
            }

            oldPage.save((err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                }
                // result.photo = undefined;
                res.json(result);
            });
        });
    });
};

exports.listPending = (req, res) => {
    Page.find({accepted: false})
        .populate('postedBy', '_id name username')
        .select('_id title accepted slug postedBy createdAt updatedAt')
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            res.json(data);
        });
};