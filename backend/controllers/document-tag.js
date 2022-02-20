const Tag = require('../models/document-tag');
const Document = require('../models/document');
const {tagCatCreate} = require("../helpers/tagcatCreate");
const {tagList} = require("../helpers/tag-list");
const {tagRead} = require("../helpers/tag-read");
const {tagDelete} = require("../helpers/tag-delete");
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
        console.log(data)
        res.json(data);
    });
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
        Document.find({tags: tag,})
            .populate('tags', '_id name  slug')
            .populate('postedBy', '_id name username')
            .select('_id title slug fileType fileSize excerpt postedBy tags createdAt updatedAt')
            .exec((err, data) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                }
                res.json({tag: tag, files: data});
            });
    });
};
exports.remove = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    tagDelete(slug, res, Tag)

};