const express = require('express')
const {
    signup,
    signout,
    signin,
    googleLogin,
    preSignup,
    forgotPassword,
    resetPassword
} = require('../controllers/auth')


const router = express.Router()

//validators
const {runValidation} = require('../validators')
const {
    userSignupValidator,
    userSigninValidator,
    forgotPasswordValidator,
    resetPasswordValidator
} = require('../validators/auth')


router.post('/pre-signup', userSignupValidator, runValidation, preSignup)
router.post('/signup', signup)
router.post('/signin', userSigninValidator, runValidation, signin)
router.get('/signout', signout)
router.put('/forgot-password', forgotPasswordValidator, runValidation, forgotPassword)
router.put('/reset-password', resetPasswordValidator, runValidation, resetPassword)
router.post('/google-login', googleLogin)

module.exports = router
