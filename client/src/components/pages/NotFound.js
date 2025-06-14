import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="container text-center py-5">
      <h1 className="x-large text-danger">
        <i className="fas fa-exclamation-triangle"></i> Page Not Found
      </h1>
      <p className="large">Sorry, this page does not exist</p>
      <div className="my-4">
        <img 
          src="/img/404.svg" 
          alt="404 Error" 
          style={{ maxWidth: '300px', width: '100%' }} 
          className="mb-4"
        />
      </div>
      <Link to="/" className="btn btn-primary btn-lg">
        <i className="fas fa-home"></i> Back to Home
      </Link>
    </section>
  );
};

export default NotFound;