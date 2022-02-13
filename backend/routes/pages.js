const express = require('express');
const router = express.Router();
const {
    create,
    list,
    listFeatured,
    read,
    remove,
    update,
    listPending,
    photo,
    listRelated, listAllServicesCategoriesTags, listServiceNamesAndSlugs
} = require('../controllers/pages');


const {requireSignin, adminMiddleware, authMiddleware, canUpdateDeleteBlog} = require('../controllers/auth');

router.post('/page', requireSignin, adminMiddleware, create);
router.get('/general', list);
router.get('/featured-general', listFeatured);
router.get('/pending-pages',  listPending);
router.get('/page-categories', listAllServicesCategoriesTags);
router.get('/general/:slug', read);
router.delete('/general/:slug', requireSignin, adminMiddleware, remove);
router.put('/general/:slug', requireSignin, adminMiddleware, update);
router.get('/general/photo/:slug', photo);
router.post('/general/related', listRelated);
router.get('/list-service-names-slugs', listServiceNamesAndSlugs);


module.exports = router;
