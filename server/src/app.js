const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const userRoutes = require("../routes/user");
var mongoose = require("mongoose");

const app = express();

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(userRoutes);

const db = require("../config/keys").mongoURI;

mongoose
  .connect(db, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log(`Database connected successfully ${db}`);
  })
  .catch(error => {
    console.log(`Unable to connect with database ${error}`);
  });

app.listen(process.env.PORT || 8081, () => {
  console.log("Running on Port");
});
