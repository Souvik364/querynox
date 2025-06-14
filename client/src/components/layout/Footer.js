import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 p-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>Quarynox</h5>
            <p>
              A platform for students to access previous year question papers easily.
            </p>
          </div>
          <div className="col-md-3">
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/papers" className="text-white">
                  Papers
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Contact</h5>
            <ul className="list-unstyled">
              <li>
                <i className="fas fa-envelope"></i> support@quarynox.com
              </li>
              <li>
                <i className="fas fa-phone"></i> +91 1234567890
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col text-center mt-3">
            <p>
              &copy; {new Date().getFullYear()} Quarynox. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;