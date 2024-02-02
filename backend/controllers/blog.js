const Blog = require('../models/blog');
const Category = require('../models/category');
const Tag = require('../models/tag');
const User = require('../models/user');
const formidable = require('formidable');
const slugify = require('slugify');
const stripHtml = require('string-strip-html');
const _ = require('lodash');
const {errorHandler} = require('../helpers/dbErrorHandler');
const fs = require('fs');
const {smartTrim} = require('../helpers/blog');
const Page = require("../models/pages");
const {lowerFirst} = require("lodash/string");


exports.create = (req, res) => {

    const {title, body, categories, images, tags} = req.body

    if (!title || !title.length) {
        return res.status(400).json({
            error: 'title is required'
        });
    }

    if (!body || body.length < 200) {
        return res.status(400).json({
            error: 'Content is too short'
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

    let blog = new Blog();
    blog.approved = false;
    blog.title = title;
    blog.images = images;
    blog.body = body;
    blog.excerpt = smartTrim(body, 320, ' ', ' ...');
    blog.slug = slugify(title).toLowerCase();
    blog.mtitle = `${title} | ${process.env.APP_NAME}`;
    blog.mdesc = stripHtml(body.substring(0, 160));


    // let arrayOfCategories = categories && categories.split(',');
    // let arrayOfTags = tags && tags.split(',');
    blog.postedBy = req.auth._id;
    blog.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        // res.json(result);
        console.log(result)
        Blog.findByIdAndUpdate(result._id, {$push: {categories: categories}}, {new: true}).exec(
            (err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                } else {
                    Blog.findByIdAndUpdate(result._id, {$push: {tags: tags}}, {new: true}).exec(
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

}


exports.list = (req, res) => {
    Blog.find({accepted: true})
        .populate('categories', '_id name slug')
        .populate('tags', '_id name slug')
        .populate('postedBy', '_id name username')
        .select('_id title slug excerpt categories images tags postedBy createdAt updatedAt')
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            res.json(data);
        });
};


exports.listAllBlogsCategoriesTags = (req, res) => {
    let limit = req.body.limit ? parseInt(req.body.limit) : 4;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;

    let blogs;
    let categories;
    let tags;

    Blog.find({accepted: true})
        .populate('categories', '_id name slug')
        .populate('tags', '_id name slug')
        .populate('postedBy', '_id name username profile')
        .sort({createdAt: -1})
        .skip(skip)
        .limit(limit)
        .select('_id title accepted slug images excerpt categories tags postedBy createdAt updatedAt')
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            blogs = data; // blogs
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
                    res.json({blogs, categories, tags, size: blogs.length});
                });
            });
        });
};

exports.read = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    Blog.findOne({slug})
        // .select("-photo")
        .populate('categories', '_id name slug')
        .populate('tags', '_id name slug')
        .populate('postedBy', '_id name username')
        .select('_id title body images accepted featured slug mtitle mdesc categories tags postedBy createdAt updatedAt')
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            res.json(data);
        });
};


exports.remove = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    Blog.findOneAndRemove({slug}).exec((err, data) => {
        if (err) {
            return res.json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: 'Blog deleted successfully'
        });
    });
};

exports.update = async (req, res) => {
    try {
        const slug = req.params.slug.toLowerCase();
        // Update the excerpt in the request body
        req.body.excerpt = smartTrim(req.body, 320, ' ', ' ...');
        const updated = await Blog.findOneAndUpdate({ slug }, req.body, { new: true }).exec();

        // If there are images, unset the 'photo' field
        if (req.body.images.length > 0) {
            await Blog.findOneAndUpdate({ slug }, { $unset: { photo: {} } }, { new: true }).exec();
        }

        res.json(updated);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};


// exports.update = async (req, res) => {
//
//
//     try {
//         const slug = req.params.slug.toLowerCase();
//         const excerpt = smartTrim(req.body, 320, ' ', ' ...')
//
//         const updated = await Blog.findOneAndUpdate({slug}, req.body, {new: true}).exec()
//         if (req.body.images.length > 0) {
//             await Blog.findOneAndUpdate({slug}, {$unset: {photo: {}}}, {new: true}).exec()
//         }
//         res.json(updated)
//
//     } catch (err) {
//         res.status(400).send({error: err.message})
//     }
//
//
// };

exports.photo = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    Blog.findOne({slug})
        .select('photo')
        .exec((err, blog) => {
            if (err || !blog) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.set('Content-Type', blog.photo.contentType);
            return res.send(blog.photo.data);
        });
};

exports.listRelated = (req, res) => {
    let limit = req.body.limit ? parseInt(req.body.limit) : 3;
    const {_id, categories} = req.body.blog;

    Blog.find({_id: {$ne: _id}, categories: {$in: categories}}, {status: 'approved'})
        .limit(limit)
        .populate('postedBy', '_id name  username profile')
        .select('title slug images excerpt postedBy createdAt updatedAt')
        .exec((err, blogs) => {
            if (err) {
                return res.status(400).json({
                    error: 'Blogs not found'
                });
            }
            res.json(blogs);
        });
};
exports.listSearch = (req, res) => {
    console.log(req.query);
    const {search} = req.query;
    if (search) {
        Blog.find(
            {
                $or: [{title: {$regex: search, $options: 'i'}}, {body: {$regex: search, $options: 'i'}}]
            },
            (err, blogs) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                }
                res.json(blogs);
            }
        ).select('-photo -body');

    }
};

exports.listByUser = (req, res) => {
    User.findOne({username: req.params.username}).exec(
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            Blog.find({postedBy: user._id, accepted: true})
                .populate('categories', '_id name slug')
                .populate('tags', '_id name slug')
                .populate('postedBy', '_id name username')
                .select('_id title accepted images  slug postedBy createdAt updatedAt')
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


exports.listHomePageBlogs = (req, res) => {
    Blog.find({accepted: true, featured: true})
        .populate('postedBy', '_id name username')
        .select('_id title images slug excerpt postedBy createdAt updatedAt')
        .limit(12)
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

exports.listPending = (req, res) => {

    Blog.find({accepted: false})
        .populate('postedBy', '_id name username')
        .select('_id title images  accepted slug postedBy createdAt updatedAt')
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }

            res.json(data);
        });
};
exports.listPendingByUser = (req, res) => {
    User.findOne({username: req.params.username}).exec(
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            Blog.find({postedBy: user._id, accepted: false})
                .populate('postedBy', '_id name username')
                .select('_id title images accepted slug postedBy createdAt updatedAt')
                .exec((err1, data) => {
                    if (err) {
                        return res.status(400).json({
                            error: errorHandler(err)
                        });
                    }
                    console.log(data)
                    res.json(data)
                })

        })
}

exports.featuredBlogs = (req, res) => {
    Blog.find({featured: true, accepted: true})
        .select('_id title images excerpt slug')
        .sort({createdAt: -1})
        .limit(12)
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            res.json(data);
        });
}

exports.listAllBlogsSlugs = (req, res) => {
    Blog.find({status: 'approved'})  // Assuming you want to filter by 'approved' status
        .select('slug')  // Only fetch the 'slug' field
        .exec((err, blogs) => {
            if (err) {
                return res.status(400).json({
                    error: 'Blogs not found'
                });
            }
            // Extract slugs and return as an array
            const slugs = blogs.map(blog => blog.slug);
            res.json({slugs});
        });
};
