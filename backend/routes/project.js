const express = require('express');
const router = express.Router();

// Controllers
const {requireSignin, adminMiddleware} = require('../controllers/auth');
const {create, list, read, remove,listAllSlugs, update} = require('../controllers/project');



// Routes for projects
router.post('/project', requireSignin, adminMiddleware, create);
router.get('/projects', list);
router.get('/project/slugs', listAllSlugs);
router.get('/project/:slug', read);
router.put('/project/:slug', requireSignin, adminMiddleware, update);
router.delete('/project/:slug', requireSignin, adminMiddleware, remove);

module.exports = router;
