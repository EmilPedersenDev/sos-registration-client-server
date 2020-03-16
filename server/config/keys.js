// Connection to db
if (process.env.NODE_ENV === "production") {
  module.exports = {
    mongoURI:
      "mongodb+srv://SosUser1:USc6MT0cqeDC6USq@sosregistration-edyry.mongodb.net/test?retryWrites=true&w=majority"
  };
} else {
  module.exports = {
    mongoURI: "mongodb://localhost:27017/users"
  };
}
