const Tag = require('../models/document-tag');
const Document = require('../models/document');
const {tagCatCreate} = require("../helpers/tagcatCreate");
const {tagList} = require("../helpers/tag-list");
const {tagRead} = require("../helpers/tag-read");
const {tagDelete} = require("../helpers/tag-delete");

exports.create = (req, res) => {
    const {name} = req.body;
    tagCatCreate(Tag, name, res)
};


exports.list = (req, res) => {
    tagList(Tag, res)
};


exports.read = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    tagRead(slug, res, Tag, Document)
};

exports.remove = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    tagDelete(slug, res, Tag)

};