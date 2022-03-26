const mongoose = require('mongoose')
const crypto = require('crypto')
const Blog = require("../models/blog")

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            trim: true,
            required: true,
            max: 32,
            unique: true,
            index: true,
            lowercase: true,
        },
        name: {
            type: String,
            trim: true,
            required: true,
            max: 32,
        },
        designation: {
            type: String,
            max: 32,
        },
        hospitalRole: {
            type: String,
            max: 32,
        },
        hmtRole: {
            type: String,
            max: 32,
        },
        address: {
            type: String,
        },
        twitter: {
            type: String,
        },
        facebook: {
            type: String,
        },
        linkedIn: {
            type: String,
        },
        instagram: {
            type: String,
        },
        hmt: {
            type: Boolean,
            default: false,
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            required: true,
            lowercase: true,
        },
        profile: {
            type: String,
            required: true,
        },
        activeStatus: {
            type: Boolean,
            default: false,

        },
        banned: {
            type: Boolean,
            default: false,
        },
        hashed_password: {
            type: String,
            required: true,
        },
        salt: String,
        about: {
            type: String,
        },
        role: {
            type: Number,
            default: 0,
        },
        photo: {
            data: Buffer,
            contentType: String,

        },
        photoDimensions: {
            type: Object
        },
        resetPasswordLink: {
            data: String,
            default: '',
        },
    },
    {timestamps: true}
)

userSchema
    .virtual('password')
    .set(function (password) {
        // create a temporarity variable called _password
        this._password = password
        // generate salt
        this.salt = this.makeSalt()
        // encryptPassword
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function () {
        return this._password
    })

userSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },

    encryptPassword: function (password) {
        if (!password) return ''
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch (err) {
            return ''
        }
    },

    makeSalt: function () {
        return Math.round(new Date().valueOf() * Math.random()) + ''
    },
}
userSchema.pre('remove', async function (next) {
    const user = this
    console.log(user)
    await Blog.remove({postedBy: user}).exec()
    next()
})

module.exports = mongoose.model('User', userSchema)
