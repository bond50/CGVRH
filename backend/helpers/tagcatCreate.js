
const slugify = require('slugify');
const {errorHandler} = require('../helpers/dbErrorHandler');

exports.tagCatCreate = (model, name, res) => {
    let slug = slugify(name).toLowerCase();
    let tag = new model({name, slug});
    tag.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};


