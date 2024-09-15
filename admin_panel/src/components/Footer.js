import React from "react";
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section about">
          <h5 className="footer-heading">Employee Management System</h5>
          <p className="footer-description">
            Efficiently manage employee information, track performance, and
            streamline HR processes. Our system is designed to improve the
            efficiency of employee management.
          </p>
        </div>

        <div className="footer-section links">
          <h5 className="footer-heading">Quick Links</h5>
          <ul className="footer-list">
            <li>
              <a href="/about" className="footer-link">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="footer-link">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/privacy" className="footer-link">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="footer-link">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section social">
          <h5 className="footer-heading">Connect With Us</h5>
          <ul className="footer-social-list">
            <li>
              <a
                href="https://www.linkedin.com/in/chetan9129/"
                className="footer-social-link"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://github.com/chetan9129/"
                className="footer-social-link"
              >
                Github
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/chetan_sharma_9129?igshid=ZDdkNTZiNTM="
                className="footer-social-link"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 Employee Management System. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
