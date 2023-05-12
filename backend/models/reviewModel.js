const mongoose = require("../connection");
const Schema = mongoose.Schema;

const schema = new Schema({
  platform: { type: mongoose.Types.ObjectId, ref: "platform" },
  text: String,
  rating: String,
  user: { type: mongoose.Types.ObjectId, ref: "users" },
});

const model = mongoose.model("review", schema);

module.exports = model;
