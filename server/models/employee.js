const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  f_Image: {
    type: String,
    required: false,
  },
  f_Name: {
    type: String,
    required: true,
  },
  f_Email: {
    type: String,
    required: true,
    unique: true,
  },
  f_Mobile: {
    type: String,
    required: true,
    unique: true,
  },
  f_Designation: {
    type: String,
    required: true,
  },
  f_Gender: {
    type: String,
    required: true,
  },
  f_Course: {
    type: String,
    required: true,
  },
  f_Createdate: {
    type: Date,
    default: Date.now,
  },

  f_Image: { type: String }, // This will store the path to the uploaded image
});

const employeeModel = mongoose.model("employee", employeeSchema);

module.exports = employeeModel;
