import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const Home = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" />;
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Quarynox</h1>
          <p className="lead">
            Your one-stop platform for accessing previous year question papers
          </p>
          <div className="buttons">
            <Link to="/papers" className="btn btn-primary btn-lg">
              Browse Papers
            </Link>
            <Link to="/admin/login" className="btn btn-light btn-lg">
              Admin Login
            </Link>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <i className="fas fa-search fa-3x mb-3 text-primary"></i>
                <h3>Find Papers</h3>
                <p>Search for papers by course, semester, subject, year, and exam type</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <i className="fas fa-download fa-3x mb-3 text-primary"></i>
                <h3>Download</h3>
                <p>Download papers instantly in PDF format for offline access</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <i className="fas fa-graduation-cap fa-3x mb-3 text-primary"></i>
                <h3>Prepare Better</h3>
                <p>Improve your exam preparation with access to previous year papers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Home.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Home);