const mongoose = require('../connection');
const Schema = mongoose.Schema;

const schema = new Schema({
    overview: String,
    easeofuse: String,
    designs: String,
    support: String,
    pricing: String,
    heroimage: String,
})

const model = mongoose.model('category', schema);

module.exports = model;