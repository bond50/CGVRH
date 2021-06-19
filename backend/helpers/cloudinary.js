const cloudinary = require('cloudinary')
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.cloudinaryUpload = (file, tag) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({
                url: result.url,
                id: result.public_id
            })
        }, {
            resource_type: "auto",
            folder: "Gallery",
            tags: tag
        })
    })
}


exports.cloudinaryRetrieve = () => cloudinary.v2.search
    .expression('folder:Gallery')
    .sort_by('public_id', 'desc')
    .with_field('tags')
    .execute()