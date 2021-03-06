const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const auth = require("../config/auth");
const User = require("../models/user");

router.post("/register", userController.registerNewUser);
router.post("/login", userController.loginUser);

router.get("/users", (req, res) => {
  User.find({}, "name email comment lat long location time", function(
    error,
    users
  ) {
    if (error) {
      console.error(error);
    }
    res.send({
      users: users
    });
  })
    .collation({ locale: "sv" })
    .sort({ name: 1 });
});

router.get("/user/:id", (req, res) => {
  User.findById(
    req.params.id,
    "_id name email comment lat long location",
    function(error, user) {
      if (error) {
        console.error(error);
      }
      res.send(user);
    }
  );
});

router.put("/user/:id", (req, res) => {
  User.findById(
    req.params.id,
    "name email comment lat long location time",
    function(error, user) {
      if (error) {
        console.error(error);
      }

      user.name = req.body.name;
      user.email = req.body.email;
      user.comment = req.body.comment;
      user.lat = req.body.lat;
      user.long = req.body.long;
      user.location = req.body.location;
      user.time = req.body.time;

      user.save(error => {
        if (error) {
          console.error(error);
        }
        res.send({
          user
        });
      });
    }
  );
});

router.delete("/user/:id", (req, res) => {
  User.remove(
    {
      _id: req.params.id
    },
    function(err, user) {
      if (err) {
        res.send(err);
      }
      res.send({
        success: true
      });
    }
  );
});

module.exports = router;
