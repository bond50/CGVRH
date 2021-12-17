const slugify = require("slugify");
const DocumentCategory = require("../models/document-category");
const {errorHandler} = require("../helpers/dbErrorHandler");

const Document = require("../models/document");


exports.create = (req, res) => {
    const {name} = req.body
    let slug = slugify(name).toLowerCase()
    let category = new DocumentCategory({name, slug})
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
    DocumentCategory.find({}).exec((err, data) => {
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

    DocumentCategory.findOne({slug}).exec((err, category) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        Document.find({categories: category})
            .populate('categories', '_id name slug')
            .populate('tags', '_id  name slug')
            .populate('postedBy', '_id name username')
            .select('_id title slug filePath categories publicId tags  fileName  fileSize fileType ')
            .exec((err, data) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                }
                res.json({category: category, services: data});
            });
    });
};


exports.remove = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    DocumentCategory.findOneAndRemove({slug}).exec((err, data) => {
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