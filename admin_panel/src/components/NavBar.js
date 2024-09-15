import React, { useEffect } from "react";
import "../css/Navbar.css";

function Navbar() {
  function getUser() {
    const cookieValue = document.cookie.match(
      new RegExp("currentUser=([^;]+)")
    );
    if (cookieValue) {
      return JSON.parse(cookieValue[1]);
    }
    return null; // Return null if the cookie is not found
  }

  const user = getUser();
  function logout() {
    document.cookie = "currentUser=;  path=/";
    window.location.href = "/login";
  }
  function booking() {
    window.location.href = "/booking";
  }
  function profile() {
    window.location.href = "/profile";
  }
  function Mybooking() {
    window.location.href = "/mybooking";
  }
  function userBooking() {
    window.location.href = "/userbooking";
  }
  function allUser() {
    window.location.href = "/list";
  }
  function createEmployee() {
    window.location.href = "/create";
  }
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light  p-1 fixed-top mb-3 navBar">
        <a
          class="navbar-brand logo-style "
          href="/"
          style={{
            fontWeight: "bolder",
            scale: "1.5",
            marginTop: "15px",
            marginLeft: "50px",
          }}
        >
          EMS
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse"
          style={{ textAlign: "right", marginRight: "75px" }}
          id="navbarNav"
        >
          <ul class="navbar-nav style-nav" style={{ marginLeft: "auto" }}>
            {user ? (
              <>
                <button
                  type="button"
                  className="btn  dropdown-toggle dropdownToggleButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style={{
                    backgroundColor: "#dee2e6",
                    marginTop: "20px",
                    scale: "1.5",
                  }}
                >
                  {user.name}
                </button>
                <div
                  className="dropdown-menu  dropdownHover1"
                  style={{ marginLeft: "-90px", marginTop: "35px" }}
                >
                  <>
                    <a
                      className="dropdown-item dropdownHover"
                      href="#"
                      onClick={allUser}
                    >
                      All Users
                    </a>
                    <a
                      className="dropdown-item dropdownHover"
                      href="#"
                      onClick={createEmployee}
                    >
                      Create Employee
                    </a>
                    <a
                      className="dropdown-item dropdownHover"
                      href="#"
                      onClick={logout}
                    >
                      Log Out
                    </a>
                  </>
                </div>
              </>
            ) : (
              <>
                <li class="nav-item active">
                  <a class="nav-link" href="/register">
                    Register
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/login">
                    Login
                  </a>
                </li>

                {/* <li className="nav-item dropdown ">
                  <a
                    className="nav-link  dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Dropdown link
                  </a>
                  <div
                    className="dropdown-menu bg-dark dropdown-menu-style"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </div>
                </li> */}
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
