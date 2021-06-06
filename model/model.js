const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const Course = new Schema({

    name: String,
    price: Number
})
module.exports = mongoose.model('Course', Course)