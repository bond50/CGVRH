const express = require('express');
const router = express.Router();
const {
    create,
    list,
    listAllBlogsCategoriesTags,
    read,
    listHomePageBlogs,
    listByUser,
    listPendingByUser,
    remove,
    update,
    photo,
    listRelated,
    listSearch,
    featuredBlogs,
    listAllBlogsSlugs,
    listPending,
    incrementViews,
    incrementLikes,
    incrementComments,
    incrementShares,
    listTrending
} = require('../controllers/blog');

const {requireSignin, adminMiddleware, authMiddleware, canUpdateDeleteBlog} = require('../controllers/auth');


router.post('/blog', requireSignin, adminMiddleware, create);
router.get('/blogs', list);
router.get('/blogs/trending', listTrending);
router.get('/featured-blogs', featuredBlogs);
router.get('/pending-blogs', requireSignin, adminMiddleware, listPending);
router.get('/list-recent-blogs', listHomePageBlogs);
router.get('/blogs/slugs', listAllBlogsSlugs);
router.post('/blogs-categories-tags', listAllBlogsCategoriesTags);
router.get('/blog/:slug', read);
router.delete('/blog/:slug', requireSignin, adminMiddleware, remove);
router.put('/blog/:slug', requireSignin, adminMiddleware, update);
router.get('/blog/photo/:slug', photo);
router.post('/blogs/related', listRelated);
router.get('/blogs/search', listSearch);


router.post('/blog/:slug/views', incrementViews);
router.post('/blog/:slug/likes', incrementLikes);
router.post('/blog/:slug/comments', incrementComments);
router.post('/blog/:slug/shares', incrementShares);

//auth user blog routes

router.post('/user/blog', requireSignin, authMiddleware, create);
router.get('/:username/pending-blogs', listPendingByUser);
router.get('/:username/blogs', listByUser);
router.delete('/user/blog/:slug', requireSignin, authMiddleware, canUpdateDeleteBlog, remove);
router.put('/user/blog/:slug', requireSignin, authMiddleware, canUpdateDeleteBlog, update);


module.exports = router;
