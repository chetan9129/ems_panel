const fs = require("fs");
const multer = require("multer");
const express = require("express");
const Employee = require("../models/employee");
const router = express.Router();

const dir = "./uploads";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir); // Store in the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 50 }, // Limit of Images
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.mimetype)) {
      const error = new Error("Invalid file type");
      error.status = 400;
      return cb(error);
    }
    cb(null, true);
  },
});
router.post("/create", upload.single("image"), async (req, res) => {
  try {
    console.log("Request Body: ", req.body);
    console.log("Uploaded File: ", req.file);

    const employeeList = new Employee({
      f_Name: req.body.name,
      f_Email: req.body.email,
      f_Mobile: req.body.mobile,
      f_Designation: req.body.designation,
      f_Gender: req.body.gender,
      f_Course: req.body.course,
      f_Createdate: new Date(),
      f_Image: req.file ? req.file.path : null,
    });

    const newEmployee = await employeeList.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error("Error creating employee:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/list", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employee list" });
  }
});

router.put("/update/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, course } = req.body;

    // Ensure 'course' is an array or convert it to one if it's a string
    let courseArray = Array.isArray(course) ? course : course.split(",");

    let updateFields = {
      f_Name: name,
      f_Email: email,
      f_Mobile: mobile,
      f_Designation: designation,
      f_Gender: gender,
      f_Course: courseArray.join(","),
    };

    if (req.file) {
      updateFields.f_Image = req.file.path;
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).send("Employee not found");
    }

    res.json(updatedEmployee);
  } catch (error) {
    console.error("Error updating employee:", error.message);
    res.status(500).send("Internal server error");
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/employee/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    console.error("Error fetching employee data:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
