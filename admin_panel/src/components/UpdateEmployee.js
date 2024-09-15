import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Success from "./Success";
import Error from "./Error";
import "react-toastify/dist/ReactToastify.css";
import "../css/UpdateEmployee.css"; // Assuming new styles

function UpdateEmployee() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [course, setCourse] = useState([]);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const designations = ["HR", "Manager", "Sales"];

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employee/${id}`
        );
        const employee = response.data;

        setName(employee.f_Name);
        setEmail(employee.f_Email);
        setMobile(employee.f_Mobile);
        setDesignation(employee.f_Designation);
        setGender(employee.f_Gender);
        setCourse(employee.f_Course.split(","));
      } catch (error) {
        console.error("Error fetching employee data:", error);
        toast.error("Failed to fetch employee data.");
      }
    };
    fetchEmployee();
  }, [id]);

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

  const updateEmployee = async () => {
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address.");
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
      await axios.put(`http://localhost:5000/api/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Employee updated successfully.");
      setSuccess(true);
    } catch (error) {
      console.error("Error updating employee:", error);
      setError(true);
      toast.error("Error updating employee.");
    }
  };

  return (
    <>
      <div className="update-employee-container">
        <div className="update-employee-box">
          {success && <Success message="Update Successful" />}
          {error && <Error message="Error occurred while updating" />}

          <h2 className="update-employee-title">Update Employee</h2>

          <form className="update-employee-form">
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Mobile Number</label>
              <input
                type="text"
                className="form-input"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Designation</label>
              <select
                className="form-select"
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
            <div className="form-group">
              <label className="form-label">Gender</label>
              <div className="form-radio-group">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="male" className="form-radio-label">
                  Male
                </label>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="female" className="form-radio-label">
                  Female
                </label>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Course</label>
              <div className="form-checkbox-group">
                <input
                  type="checkbox"
                  id="mca"
                  value="MCA"
                  checked={course.includes("MCA")}
                  onChange={handleCourseChange}
                />
                <label htmlFor="mca" className="form-checkbox-label">
                  MCA
                </label>
                <input
                  type="checkbox"
                  id="bca"
                  value="BCA"
                  checked={course.includes("BCA")}
                  onChange={handleCourseChange}
                />
                <label htmlFor="bca" className="form-checkbox-label">
                  BCA
                </label>
                <input
                  type="checkbox"
                  id="bsc"
                  value="BSC"
                  checked={course.includes("BSC")}
                  onChange={handleCourseChange}
                />
                <label htmlFor="bsc" className="form-checkbox-label">
                  BSC
                </label>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Image</label>
              <input
                type="file"
                className="form-input"
                onChange={handleImageUpload}
              />
            </div>
            <div className="form-group">
              <button
                type="button"
                className="form-submit-button"
                onClick={updateEmployee}
              >
                Update
              </button>
            </div>
          </form>
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

export default UpdateEmployee;
