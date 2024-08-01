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
const SEO = require('../models/seo');



exports.create = async (req, res) => {
    const { title, body, categories, images, tags } = req.body;

    if (!title || title.length < 3 || title.length > 160) {
        return res.status(400).json({
            error: 'Title is required and must be between 3 and 160 characters'
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
    blog.accepted = false;
    blog.title = title;
    blog.images = images;
    blog.body = body;
    blog.excerpt = smartTrim(body, 320, ' ', ' ...');
    blog.slug = slugify(title).toLowerCase();
    blog.mtitle = `${title} | ${process.env.APP_NAME}`;
    blog.mdesc = stripHtml(body.substring(0, 160)).result;
    blog.postedBy = req.auth._id;

    try {
        const savedBlog = await blog.save();

        const updatedBlog = await Blog.findByIdAndUpdate(
            savedBlog._id,
            { $set: { categories: categories, tags: tags } },
            { new: true }
        ).exec();

        res.json(updatedBlog);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler(err)
        });
    }
};

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


exports.listAllBlogsCategoriesTags = async (req, res) => {
    let limit = req.body.limit ? parseInt(req.body.limit) : 4;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;
    const seoId = '668175f5879d792ab67edfa1'

    try {
        // Find all blogs with the given criteria
        const blogs = await Blog.find({accepted: true})
            .populate('categories', '_id name slug')
            .populate('tags', '_id name slug')
            .populate('postedBy', '_id name username profile')
            .sort({createdAt: -1})
            .skip(skip)
            .limit(limit)
            .select('_id title accepted slug images excerpt categories tags postedBy createdAt updatedAt')
            .exec();

        // Find all categories
        const categories = await Category.find({}).exec();

        // Find all tags
        const tags = await Tag.find({}).exec();
        const seoSettings = await SEO.find({page: seoId}).populate("page").exec();



        // Count blogs in each category
        const categoryBlogCounts = await Blog.aggregate([
            {$match: {accepted: true}},
            {$unwind: '$categories'},
            {$group: {_id: '$categories', count: {$sum: 1}}}
        ]);

        // Map category counts to categories
        const categoriesWithCounts = categories.map(category => {
            const count = categoryBlogCounts.find(count => String(count._id) === String(category._id));
            return {
                ...category.toObject(),
                blogCount: count ? count.count : 0
            };
        });

        // Return all blogs, categories with counts, and tags
        res.json({blogs, categories: categoriesWithCounts, tags, size: blogs.length, seoSettings: seoSettings});

    } catch (err) {
        return res.json({
            error: errorHandler(err)
        });
    }
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


        req.body.excerpt = smartTrim(req.body.body, 320, ' ', ' ...');
        const updated = await Blog.findOneAndUpdate({slug}, req.body, {new: true}).exec();

        // If there are images, unset the 'photo' field
        if (req.body.images.length > 0) {
            await Blog.findOneAndUpdate({slug}, {$unset: {photo: {}}}, {new: true}).exec();
        }

        res.json(updated);
    } catch (err) {
        console.log(err)
        res.status(400).send({error: err.message});
    }
};


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
        .limit(4)
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


exports.listTrending = async (req, res) => {
    try {
        const trendingBlogs = await Blog.aggregate([
            {
                $match: {
                    accepted: true,
                    views: { $gt: 10 }
                }
            },
            {
                $addFields: {
                    score: {
                        $add: [
                            "$views",
                            { $multiply: ["$likes", 2] },
                            { $multiply: ["$comments", 3] },
                            { $multiply: ["$shares", 4] }
                        ]
                    }
                }
            },
            {
                $sort: { score: -1 }
            },
            {
                $limit: 10
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'categories',
                    foreignField: '_id',
                    as: 'categories'
                }
            },
            {
                $lookup: {
                    from: 'tags',
                    localField: 'tags',
                    foreignField: '_id',
                    as: 'tags'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'postedBy',
                    foreignField: '_id',
                    as: 'postedBy'
                }
            },
            {
                $unwind: "$postedBy"
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    slug: 1,
                    images: 1,
                    excerpt: 1,
                    categories: { _id: 1, name: 1, slug: 1 },
                    tags: { _id: 1, name: 1, slug: 1 },
                    postedBy: { _id: 1, name: 1, username: 1, profile: 1 },
                    createdAt: 1,
                    updatedAt: 1,
                    views: 1,
                    likes: 1,
                    comments: 1,
                    shares: 1
                }
            }
        ]);

        console.log(trendingBlogs);
        res.json(trendingBlogs);
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            error: errorHandler(err)
        });
    }
};


exports.incrementViews = async (req, res) => {
    try {
        const blog = await Blog.findOneAndUpdate(
            {slug: req.params.slug},
            {$inc: {views: 1}},
            {new: true}
        ).exec();
        res.json(blog);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler(err)
        });
    }
};

exports.incrementLikes = async (req, res) => {
    try {
        const blog = await Blog.findOneAndUpdate(
            {slug: req.params.slug},
            {$inc: {likes: 1}},
            {new: true}
        ).exec();
        res.json(blog);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler(err)
        });
    }
};

exports.incrementComments = async (req, res) => {
    try {
        const blog = await Blog.findOneAndUpdate(
            {slug: req.params.slug},
            {$inc: {comments: 1}},
            {new: true}
        ).exec();
        res.json(blog);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler(err)
        });
    }
};

exports.incrementShares = async (req, res) => {
    try {
        const blog = await Blog.findOneAndUpdate(
            {slug: req.params.slug},
            {$inc: {shares: 1}},
            {new: true}
        ).exec();
        res.json(blog);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler(err)
        });
    }
};
