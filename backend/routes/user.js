const express = require('express')
const {requireSignin, authMiddleware, adminMiddleware,} = require('../controllers/auth')
const {
    read,
    publicProfile,
    update,
    photo,
    list,
    singleUpdate,
    readForAdmin,
    removeUser,
    listHMT
} = require('../controllers/user')
const router = express.Router()


router.get('/user/profile', requireSignin, authMiddleware, read);
router.get('/user/:username', publicProfile);
router.put('/single-user/:_id', requireSignin, authMiddleware, singleUpdate);
router.get('/user/photo/:username', photo);
router.get('/users-hmt', listHMT);

//admin routes
router.get('/all-users', requireSignin, adminMiddleware, list);
router.get('/single-user/:_id', requireSignin, adminMiddleware, readForAdmin);
router.delete('/single-user/:_id', requireSignin, adminMiddleware, removeUser);
router.put('/single-user/:_id', requireSignin, adminMiddleware, singleUpdate);

module.exports = router
