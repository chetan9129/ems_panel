import React, { useState } from "react";
import "../css/CreateEmployee.css";
import Success from "./Success";
import axios from "axios";
import Error from "./Error";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateEmployee() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [designation, setDesignation] = useState("");

  const [gender, setGender] = useState("");
  const [course, setCourse] = useState([]);
  const [image, setImage] = useState(null);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const designations = ["HR", "Manager", "Sales"];

  const handleCourseChange = (e) => {
    const isChecked = e.target.checked;
    const value = e.target.value;

    if (isChecked) {
      setCourse([...course, value]);
    } else {
      setCourse(course.filter((item) => item !== value));
    }
  };

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  async function register() {
    if (!email.includes("@")) {
      toast("Please Enter valid Email Id");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("designation", designation);
    formData.append("gender", gender);
    formData.append("course", course.join(","));
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast("Employee Registered Successfully");
      setSuccess(true);
      // Reset form fields
      setName("");
      setEmail("");
      setMobile("");
      setDesignation("");
      setGender("");
      setCourse([]);
      setImage(null);
    } catch (error) {
      setError(true);
      console.log(error);
      toast("Error Occured!!!");
    }
  }

  return (
    <>
      <div className="container" style={{ marginTop: "70px" }}>
        <div className="row">
          {success}
          <div className="custom-col-3"></div>
          <div className="custom-col-6 custom-login-box">
            <div className="custom-title">REGISTER PANEL</div>
            {error && <Error />}
            {success && <Success message="Registration Successfull" />}

            <div className="form">
              <div className="form-group">
                <label className="custom-label" name="name">
                  NAME
                </label>
                <input
                  type="text"
                  className="custom-input"
                  name="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="custom-form-group">
                <label className="custom-label">EMAIL</label>
                <input
                  type="email"
                  className="custom-input"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="custom-form-group">
                <label className="custom-label">MOBILE NUMBER</label>
                <input
                  type="text"
                  name="mobile"
                  className="custom-input"
                  value={mobile}
                  onChange={(e) => {
                    setMobile(e.target.value);
                  }}
                />
              </div>
              <div className="custom-form-group">
                <label className="custom-label">DESIGNATION</label>
                <select
                  className="custom-select"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                >
                  <option value="">Select Designation</option>
                  {designations.map((designation) => (
                    <option key={designation} value={designation}>
                      {designation}
                    </option>
                  ))}
                </select>
              </div>
              <div className="custom-form-group bs1">
                <label className="custom-label">GENDER</label>
                <div className="custom-radio-group">
                  <input
                    type="radio"
                    className="custom-radio"
                    name="gender"
                    value="Male"
                    checked={gender === "Male"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label className="custom-radio-label">Male</label>
                </div>
                <div className="custom-radio-group bs1">
                  <input
                    type="radio"
                    className="custom-radio"
                    name="gender"
                    value="Female"
                    checked={gender === "Female"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label className="custom-radio-label">Female</label>
                </div>
              </div>
              <div className="custom-form-group">
                <label className="custom-label">COURSE</label>
                <div className="custom-checkbox-group">
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    value="MCA"
                    checked={course.includes("MCA")}
                    onChange={handleCourseChange}
                  />
                  <label className="custom-checkbox-label">MCA</label>
                </div>
                <div className="custom-checkbox-group">
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    value="BCA"
                    checked={course.includes("BCA")}
                    onChange={handleCourseChange}
                  />
                  <label className="custom-checkbox-label">BCA</label>
                </div>
                <div className="custom-checkbox-group">
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    value="BSC"
                    checked={course.includes("BSC")}
                    onChange={handleCourseChange}
                  />
                  <label className="custom-checkbox-label">BSC</label>
                </div>
              </div>
              <div className="custom-form-group">
                <label className="custom-label">IMAGE</label>
                <input
                  type="file"
                  className="custom-input"
                  onChange={handleImageUpload}
                />
              </div>
              <div className="custom-button-container">
                <button
                  type="submit"
                  className="custom-button"
                  onClick={register}
                >
                  REGISTER
                </button>
              </div>
            </div>
          </div>
          <div className="custom-col-3"></div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default CreateEmployee;
