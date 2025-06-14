import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section className="container">
      <h1 className="large text-primary">About Quarynox</h1>
      <p className="lead">
        <i className="fas fa-info-circle"></i> Learn more about our platform
      </p>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">Our Mission</h2>
          <p>
            Quarynox is dedicated to making education more accessible by providing a centralized
            platform for students to access previous year question papers. We believe that having
            access to past exam papers is crucial for effective exam preparation and academic success.
          </p>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">What We Offer</h2>
          <ul className="list-group list-group-flush mb-3">
            <li className="list-group-item">
              <i className="fas fa-search text-primary me-2"></i>
              Easy search and filtering of papers by college, course, semester, subject, year, and exam type
            </li>
            <li className="list-group-item">
              <i className="fas fa-download text-primary me-2"></i>
              Free downloads of PDF question papers
            </li>
            <li className="list-group-item">
              <i className="fas fa-database text-primary me-2"></i>
              A growing database of papers from various colleges and universities
            </li>
            <li className="list-group-item">
              <i className="fas fa-mobile-alt text-primary me-2"></i>
              Mobile-friendly interface for on-the-go access
            </li>
          </ul>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">How It Works</h2>
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body text-center">
                  <div className="rounded-circle bg-light d-inline-flex justify-content-center align-items-center mb-3" style={{ width: '80px', height: '80px' }}>
                    <h2 className="mb-0">1</h2>
                  </div>
                  <h4>Browse</h4>
                  <p>Navigate through our collection using filters</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body text-center">
                  <div className="rounded-circle bg-light d-inline-flex justify-content-center align-items-center mb-3" style={{ width: '80px', height: '80px' }}>
                    <h2 className="mb-0">2</h2>
                  </div>
                  <h4>Find</h4>
                  <p>Locate the exact paper you need</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body text-center">
                  <div className="rounded-circle bg-light d-inline-flex justify-content-center align-items-center mb-3" style={{ width: '80px', height: '80px' }}>
                    <h2 className="mb-0">3</h2>
                  </div>
                  <h4>Download</h4>
                  <p>Get the paper in PDF format instantly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">For Administrators</h2>
          <p>
            Quarynox provides a comprehensive admin panel for educational institutions to manage their
            question paper repository. Administrators can:
          </p>
          <ul className="list-group list-group-flush mb-3">
            <li className="list-group-item">
              <i className="fas fa-university text-primary me-2"></i>
              Manage colleges and departments
            </li>
            <li className="list-group-item">
              <i className="fas fa-book text-primary me-2"></i>
              Organize courses, semesters, and subjects
            </li>
            <li className="list-group-item">
              <i className="fas fa-upload text-primary me-2"></i>
              Upload and categorize question papers
            </li>
            <li className="list-group-item">
              <i className="fas fa-chart-bar text-primary me-2"></i>
              Track downloads and user engagement
            </li>
          </ul>
          <p>
            If you're an administrator looking to manage your institution's question papers,
            please <Link to="/admin/login">login here</Link>.
          </p>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">Contact Us</h2>
          <p>
            Have questions, suggestions, or want to contribute papers? We'd love to hear from you!
          </p>
          <p>
            <i className="fas fa-envelope text-primary me-2"></i>
            Email: support@quarynox.com
          </p>
          <p>
            <i className="fas fa-phone text-primary me-2"></i>
            Phone: +1 (123) 456-7890
          </p>
          <div className="d-flex">
            <a href="#!" className="me-3 text-primary">
              <i className="fab fa-facebook fa-2x"></i>
            </a>
            <a href="#!" className="me-3 text-primary">
              <i className="fab fa-twitter fa-2x"></i>
            </a>
            <a href="#!" className="me-3 text-primary">
              <i className="fab fa-instagram fa-2x"></i>
            </a>
            <a href="#!" className="text-primary">
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;