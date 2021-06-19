const express = require('express')
const {
    signup,
    signout,
    signin,
    requireSignin,
} = require('../controllers/auth')
const router = express.Router()

//validators
const { runValidation } = require('../validators')
const { userSignupValidator } = require('../validators/auth')
const {userSigninValidator } = require('../validators/auth')

router.post('/signup', userSignupValidator, runValidation, signup)
router.post('/signin', userSigninValidator, runValidation, signin)
router.get('/signout', signout)

// test
router.get('/secret',requireSignin, (req, res) => {
    console.log(req.auth)
    res.json({
        user:req.auth

    })
})

module.exports = router
