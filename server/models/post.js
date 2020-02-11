var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  name: String,
  email: String,
  lat: Number,
  long: Number,
  comment: String
});

var Post = mongoose.model("Post", PostSchema);

module.exports = Post;
