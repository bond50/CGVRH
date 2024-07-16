const SEO = require("../models/seo");



exports.listSEOSettings = async (req, res) => {
    const seoSettings = await SEO.find({page: '66967066526f7ba80a463703'}).populate("page").exec();
    res.json(seoSettings);
}