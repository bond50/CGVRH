const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

// Define the project schema
const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            min: 3,
            max: 160,
            required: true
        },
        slug: {
            type: String,
            unique: true,
            index: true
        },
        accepted: {
            type: Boolean,
            default: true,
        },
        featured: {
            type: Boolean,
            default: false,
        },
        body: {
            type: {},
            required: true,
            min: 200,
            max: 2000000
        },
        metaTitle: {
            type: String
        },
        images: {
            type: Array
        },
        metaDesc: {
            type: String
        },
        description: {
            type: String,
            required: true
        },
        postedBy: {
            type: ObjectId,
            ref: 'User'
        },
        excerpt: {
            type: String,
            max: 1000
        },
        progress: {
            type: String,
            enum: ['ongoing', 'finished', 'pending'],
            default: 'ongoing' // Default status
        }
    },
    {timestamps: true}
);

// Create and export the project model
module.exports = mongoose.model('Project', projectSchema);
