import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/LandingPage.css";
import AOS from "aos";
import "aos/dist/aos.css";

function LandingPage() {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h2 data-aos="zoom-in" className="landing-title">
          Employee Management System
        </h2>
        <h1 data-aos="zoom-out" className="landing-slogan">
          Efficient employees, effective systems
        </h1>
        <Link to="/home">
          <button className="landing-button">Get Started</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
