import React from "react";
import { Link } from "react-router-dom";
import "../css/Discover.css";

function Discover() {
  function getUser() {
    const cookieValue = document.cookie.match(
      new RegExp("currentUser=([^;]+)")
    );
    if (cookieValue) {
      return JSON.parse(cookieValue[1]);
    }
    return null;
  }

  const user = getUser();
  return (
    <div className="discover-container">
      <div className="discover-content">
        <hr className="divider" />
        <h2 className="section-heading">
          Welcome to <span>Employee Management System</span>
        </h2>

        <p className="section-description">
          Our Employee Management System streamlines the process of managing
          employees, from onboarding to day-to-day operations. As an admin, you
          can create and manage employee profiles, track their activities, and
          more. Explore the features we offer to make employee management
          effortless and efficient.
        </p>
        <p className="section-subheading">
          EXPERIENCE THE FUTURE OF EMPLOYEE MANAGEMENT
        </p>
        {user ? (
          <>
            <div className="admin-actions">
              <Link to="/create" className="action-button">
                Create Employee
              </Link>
              <Link to="/list" className="action-button">
                View All Employees
              </Link>
              <Link to="/profile" className="action-button">
                My Profile
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="user-actions">
              <Link to="/register" className="action-button">
                Register
              </Link>
              <Link to="/login" className="action-button">
                Login
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Discover;
