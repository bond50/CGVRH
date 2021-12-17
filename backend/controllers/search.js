const Blog = require("../models/blog");
const Service = require("../models/services");

const {errorHandler} = require("../helpers/dbErrorHandler");
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
