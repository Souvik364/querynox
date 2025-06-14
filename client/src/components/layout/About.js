import React from 'react';

const About = () => {
  return (
    <section className="container">
      <h1 className="large text-primary">About Quarynox</h1>
      <p className="lead">
        <i className="fas fa-file-pdf"></i> Your one-stop solution for Previous Year Question Papers
      </p>
      
      <div className="bg-light p-4 my-3">
        <h3>Our Mission</h3>
        <p>
          At Quarynox, we believe that access to quality educational resources should be easy and convenient. 
          Our mission is to provide students with a comprehensive collection of previous year question papers 
          to help them prepare better for their examinations.
        </p>
      </div>
      
      <div className="bg-light p-4 my-3">
        <h3>What We Offer</h3>
        <ul className="list">
          <li>
            <i className="fas fa-check"></i> Extensive collection of previous year question papers
          </li>
          <li>
            <i className="fas fa-check"></i> Well-organized papers by college, course, semester, and subject
          </li>
          <li>
            <i className="fas fa-check"></i> Easy search and filter functionality
          </li>
          <li>
            <i className="fas fa-check"></i> Free downloads for all users
          </li>
          <li>
            <i className="fas fa-check"></i> Regular updates with the latest papers
          </li>
        </ul>
      </div>
      
      <div className="bg-light p-4 my-3">
        <h3>How It Works</h3>
        <p>
          Our platform is designed to be intuitive and user-friendly. Simply navigate to the Papers section, 
          use the filters to find the papers you need, and download them with a single click. No registration 
          required for basic usage!
        </p>
      </div>
      
      <div className="bg-light p-4 my-3">
        <h3>For Administrators</h3>
        <p>
          Administrators can log in to manage the platform's content. This includes adding new colleges, 
          courses, semesters, subjects, and uploading new papers. Our admin interface is designed to make 
          content management as simple as possible.
        </p>
      </div>
      
      <div className="bg-light p-4 my-3">
        <h3>Contact Us</h3>
        <p>
          Have questions or suggestions? We'd love to hear from you! Reach out to us at 
          <a href="mailto:support@quarynox.com"> support@quarynox.com</a> or call us at +91 1234567890.
        </p>
      </div>
    </section>
  );
};

export default About;