import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/EmployeeList.css"; // Add necessary CSS for styling
import { Link } from "react-router-dom";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const employeesPerPage = 10;

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/list");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employee list:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.f_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.f_Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.f_Designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (sortField) {
      const fieldA = a[sortField].toString().toLowerCase();
      const fieldB = b[sortField].toString().toLowerCase();
      if (sortOrder === "asc") {
        return fieldA < fieldB ? -1 : 1;
      } else {
        return fieldA > fieldB ? -1 : 1;
      }
    }
    return 0;
  });

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = sortedEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSort = (field) => {
    const newSortOrder =
      sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newSortOrder);
  };

  const toggleActive = async (employeeId, isActive) => {
    try {
      await axios.put(`http://localhost:5000/api/employee/${employeeId}`, {
        isActive: !isActive,
      });
      fetchEmployees();
    } catch (error) {
      console.error("Error toggling employee active status:", error);
    }
  };

  const deleteEmployee = async (employeeId) => {
    try {
      await axios.delete(`http://localhost:5000/api/employee/${employeeId}`);
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const editEmployee = (employeeId) => {
    window.location.href = `/update/${employeeId}`;
  };

  return (
    <div className="employee-list">
      <h2 className="employee-list-title">Employee List</h2>
      <div className="employee-list-header">
        <Link to="/create">
          <button className="employee-list-button">Create Employee</button>
        </Link>
        <input
          type="text"
          className="employee-list-search"
          placeholder="Search by Name, Email, or Designation"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="employee-list-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("_id")}>Unique ID</th>
            <th>Image</th>
            <th onClick={() => handleSort("f_Name")}>Name</th>
            <th onClick={() => handleSort("f_Email")}>Email</th>
            <th>Mobile No</th>
            <th onClick={() => handleSort("f_Designation")}>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th onClick={() => handleSort("f_Createdate")}>Create Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee, index) => (
            <tr key={employee._id}>
              <td>{indexOfFirstEmployee + index + 1}</td>
              <td>
                <img
                  src={`http://localhost:5000/${employee.f_Image}`}
                  alt="Employee"
                  className="employee-list-image"
                />
              </td>
              <td>{employee.f_Name}</td>
              <td>
                <a href={`mailto:${employee.f_Email}`}>{employee.f_Email}</a>
              </td>
              <td>{employee.f_Mobile}</td>
              <td>{employee.f_Designation}</td>
              <td>{employee.f_Gender}</td>
              <td>
                {Array.isArray(employee.f_Course)
                  ? employee.f_Course.join(", ")
                  : employee.f_Course}
              </td>
              <td>{new Date(employee.f_Createdate).toLocaleDateString()}</td>
              <td>
                <button
                  className="employee-list-action"
                  onClick={() => editEmployee(employee._id)}
                >
                  Edit
                </button>
                <button
                  className="employee-list-action"
                  onClick={() => deleteEmployee(employee._id)}
                >
                  Delete
                </button>
                <button
                  className="employee-list-action"
                  onClick={() => toggleActive(employee._id, employee.isActive)}
                >
                  {employee.isActive ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="employee-list-pagination">
        {Array.from(
          { length: Math.ceil(filteredEmployees.length / employeesPerPage) },
          (_, i) => (
            <button
              key={i + 1}
              className={`pagination-button ${
                currentPage === i + 1 ? "active" : ""
              }`}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default EmployeeList;
