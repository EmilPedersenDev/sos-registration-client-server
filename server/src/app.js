const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
var Post = require("../models/post");
const userRoutes = require("../routes/user");

const app = express();

app.use(morgan("combined"));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/user", userRoutes);

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/posts");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback) {
  console.log("Connection Succeeded");
});

app.get("/posts", (req, res) => {
  console.log("running get all posts");
  Post.find({}, "title description", function(error, posts) {
    if (error) {
      console.error(error);
    }
    res.send({
      posts: posts
    });
  }).sort({ _id: -1 });
});

app.get("/post/:id", (req, res) => {
  console.log("running get post id");

  var db = req.db;
  Post.findById(req.params.id, "title description", function(error, post) {
    if (error) {
      console.log(error);
    }
    res.send(post);
  });
});

app.put("/posts/:id", (req, res) => {
  var db = req.db;
  Post.findById(req.params.id, "title description", function(error, post) {
    //hej
    if (error) {
      console.log(error);
    }
    post.title = req.body.title;
    post.description = req.body.description;

    post.save(function(error) {
      if (error) {
        console.log(error);
      }
      res.send({
        success: true
      });
    });
  });
});

app.post("/posts", (req, res) => {
  var db = req.db;
  var name = req.body.name;
  var email = req.body.email;
  var lat = req.body.lat;
  var long = req.body.long;
  var comment = req.body.comment;

  var description = req.body.description;
  var new_post = new Post({
    name: name,
    email: email,
    lat: lat,
    long: long,
    comment: comment
  });

  new_post.save(function(error) {
    if (error) {
      console.log(error);
    }

    res.send({
      success: true,
      message: "Post saved successfully"
    });
  });
});

app.listen(process.env.PORT || 8081, () => {
  console.log("Running on Port");
});
