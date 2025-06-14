import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getColleges } from '../../actions/collegeActions';
import { getCourses } from '../../actions/courseActions';
import { getSemesters } from '../../actions/semesterActions';
import { getSubjects } from '../../actions/subjectActions';
import { getPapers } from '../../actions/paperActions';

const Dashboard = ({
  auth: { admin },
  college: { colleges, loading: collegeLoading },
  course: { courses, loading: courseLoading },
  semester: { semesters, loading: semesterLoading },
  subject: { subjects, loading: subjectLoading },
  paper: { papers, loading: paperLoading },
  getColleges,
  getCourses,
  getSemesters,
  getSubjects,
  getPapers
}) => {
  useEffect(() => {
    getColleges();
    getCourses();
    getSemesters();
    getSubjects();
    getPapers();
  }, [getColleges, getCourses, getSemesters, getSubjects, getPapers]);

  return (
    <section className="container">
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {admin && admin.name}
      </p>

      <div className="dash-buttons">
        <Link to="/admin/colleges" className="btn btn-light">
          <i className="fas fa-university text-primary"></i> Manage Colleges
        </Link>
        <Link to="/admin/courses" className="btn btn-light">
          <i className="fas fa-graduation-cap text-primary"></i> Manage Courses
        </Link>
        <Link to="/admin/semesters" className="btn btn-light">
          <i className="fas fa-calendar-alt text-primary"></i> Manage Semesters
        </Link>
        <Link to="/admin/subjects" className="btn btn-light">
          <i className="fas fa-book text-primary"></i> Manage Subjects
        </Link>
        <Link to="/admin/papers" className="btn btn-light">
          <i className="fas fa-file-pdf text-primary"></i> Manage Papers
        </Link>
      </div>

      <div className="row mt-4">
        <div className="col-md-4 mb-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h5 className="card-title">Colleges</h5>
              <p className="card-text display-4">
                {collegeLoading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  colleges.length
                )}
              </p>
              <Link to="/admin/colleges" className="btn btn-light btn-sm">
                View Details
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h5 className="card-title">Courses</h5>
              <p className="card-text display-4">
                {courseLoading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  courses.length
                )}
              </p>
              <Link to="/admin/courses" className="btn btn-light btn-sm">
                View Details
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card bg-warning text-dark">
            <div className="card-body">
              <h5 className="card-title">Semesters</h5>
              <p className="card-text display-4">
                {semesterLoading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  semesters.length
                )}
              </p>
              <Link to="/admin/semesters" className="btn btn-light btn-sm">
                View Details
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h5 className="card-title">Subjects</h5>
              <p className="card-text display-4">
                {subjectLoading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  subjects.length
                )}
              </p>
              <Link to="/admin/subjects" className="btn btn-light btn-sm">
                View Details
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card bg-danger text-white">
            <div className="card-body">
              <h5 className="card-title">Papers</h5>
              <p className="card-text display-4">
                {paperLoading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  papers.length
                )}
              </p>
              <Link to="/admin/papers" className="btn btn-light btn-sm">
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-light p-4 mt-4">
        <h3>Recent Activity</h3>
        <p>
          This section will show recent uploads and changes. Feature coming soon.
        </p>
      </div>
    </section>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  college: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
  semester: PropTypes.object.isRequired,
  subject: PropTypes.object.isRequired,
  paper: PropTypes.object.isRequired,
  getColleges: PropTypes.func.isRequired,
  getCourses: PropTypes.func.isRequired,
  getSemesters: PropTypes.func.isRequired,
  getSubjects: PropTypes.func.isRequired,
  getPapers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  college: state.college,
  course: state.course,
  semester: state.semester,
  subject: state.subject,
  paper: state.paper
});

export default connect(mapStateToProps, {
  getColleges,
  getCourses,
  getSemesters,
  getSubjects,
  getPapers
})(Dashboard);