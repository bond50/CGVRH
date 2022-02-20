const Tag = require('../models/gallery-tag');
const {tagCatCreate} = require("../helpers/tagcatCreate");
const {tagList} = require("../helpers/tag-list");
const {tagDelete} = require("../helpers/tag-delete");
const {tagRead} = require("../helpers/tag-read");
const Gallery = require("../models/gallery");
const Blog = require("../models/blog");
const {errorHandler} = require("../helpers/dbErrorHandler");

exports.create = (req, res) => {
    const {name} = req.body;
    tagCatCreate(Tag, name, res)
};

exports.list = (req, res) => {
    Tag.find({}).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};


// exports.read = (req, res) => {
//     const slug = req.params.slug.toLowerCase();
//     tagRead(slug, res, Tag, Gallery)
// };

exports.remove = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    console.log("slug", slug)
    tagDelete(slug, res, Tag)
};

exports.read = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    Tag.findOne({slug}).exec((err, tag) => {
        if (err) {
            return res.status(400).json({
                error: 'Tag not found'
            });
        }
        // res.json(tag);
        Gallery.find({tags: tag})
            .populate('tags', '_id name  slug')
            .populate('uploadedBy', '_id name username')
            .select('_id filePath title cloudinaryFolder publicId tags fileName fileType fileSize createdAt')
            .exec((err, data) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                }
                console.log(data)
                res.json({tag: tag, data: data});
            });
    });
};