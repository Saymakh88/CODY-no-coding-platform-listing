const mongoose = require('../connection');
const Schema = mongoose.Schema;

const schema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    isAdmin: { type: Boolean, default: false },
    createdAt: { type: Date, default: new Date() }
})

const model = mongoose.model('admin', schema);

module.exports = model;