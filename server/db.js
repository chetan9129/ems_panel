const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

var mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  // useFindAndModify: false,
});

var connection = mongoose.connection;
// console.log(process.env.MONGO_URL);
connection.on("error", () => {
  console.log("Mongo DB connection Failed");
});

connection.on("connected", () => {
  console.log("Mongo DB connection Successfull");
});

module.exports = mongoose;
