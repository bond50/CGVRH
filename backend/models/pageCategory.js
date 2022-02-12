const mongoose = require('mongoose')

const pageCategorySchema = new mongoose.Schema(
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
)


module.exports = mongoose.model('PageCategory', pageCategorySchema)
