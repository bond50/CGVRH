const express = require('express');
const router = express.Router();
const {
    create,
    list,
    listAllBlogsCategoriesTags,
    read,
    remove,
    update,
    photo,
    listRelated
} = require('../controllers/services');


const {requireSignin, adminMiddleware} = require('../controllers/auth');
router.post('/service', requireSignin, adminMiddleware, create);
// router.get('/services', list);
// router.post('/services-categories-tags', listAllBlogsCategoriesTags);
// router.get('/service/:slug', read);
// router.delete('/service/:slug', requireSignin, adminMiddleware, remove);
// router.put('/service/:slug', requireSignin, adminMiddleware, update);
// router.get('/service/photo/:slug', photo);
// router.post('/services/related', listRelated);

module.exports = router;
