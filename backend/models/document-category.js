const mongoose = require('mongoose');

const documentCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        slug: {
            type: String,
            unique: true,
            index: true
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model('DocumentCategory', documentCategorySchema);