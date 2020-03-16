const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const userRoutes = require("./routes/user");
const path = require("path");
var mongoose = require("mongoose");

const app = express();

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(userRoutes);

app.get("/", (req, res) => {
  res.send("Success, this route is deployed");
});

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/users", {
    useNewUrlParser: true
  })
  .then(() => {
    console.log(`Database connected successfully `);
  })
  .catch(error => {
    console.log(`Unable to connect with database ${error}`);
  });

var dbConnect = mongoose.connection;
dbConnect.on("error", console.error.bind(console, "connection error"));
dbConnect.once("open", function(callback) {
  console.log("Connection Succeeded");
});

const port = process.env.PORT || 8081;

app.listen(port, () => {
  console.log(`Running on Port ${port}`);
});
