const {Schema, model} = require('mongoose');


const gallery = new Schema({

}, {timestamps: true});

module.exports = model('gallery', gallery);