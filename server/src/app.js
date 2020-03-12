const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const userRoutes = require("../routes/user");
const path = require("path");
var mongoose = require("mongoose");

const app = express();

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", userRoutes);

app.use(express.static(path.join(__dirname, "../public")));

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

var dbConnect = mongoose.connection;
dbConnect.on("error", console.error.bind(console, "connection error"));
dbConnect.once("open", function(callback) {
  console.log("Connection Succeeded");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Running on Port ${port}`);
});
