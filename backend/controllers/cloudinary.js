const cloudinary = require('cloudinary')
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.upload = async (req, res) => {
    const {folder, image} = req.body

    let result = await cloudinary.v2.uploader.upload(image, {
        resource_type: "auto",
        public_id: `${Date.now()}`,
        folder: folder
    })

    res.json({
        public_id: result.public_id,
        url: result.secure_url,
        width: result.width,
        height: result.height,
        cloudinaryFolder: result.folder,
        fileType: `${result.resource_type}/${result.format}`
    })

}
exports.remove = (req, res) => {
    const imageId = req.body.public_id
    cloudinary.uploader.destroy(imageId, (err, result) => {
        console.log(result)

        if (err) {
            console.log(err)
            res.json({success: false, err})
        }
        res.send('ok')
    })

}