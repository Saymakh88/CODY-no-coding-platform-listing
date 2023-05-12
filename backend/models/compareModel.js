const mongoose = require('../connection');
const Schema = mongoose.Schema;

const schema = new Schema({
    overview: String,
    easeofuse: String,
    heroimage: String,
    pricingplans: String,
    pricingoffer: String,
    feature: String,
    conclusion: String,
})

const model = mongoose.model('comparison', schema);

module.exports = model;