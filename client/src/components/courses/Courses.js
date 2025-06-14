import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCourses } from '../../actions/courseActions';
import { getColleges } from '../../actions/collegeActions';
import CourseItem from './CourseItem';
import CourseForm from './CourseForm';
import Spinner from '../layout/Spinner';

const Courses = ({
  course: { courses, loading },
  college: { colleges },
  getCourses,
  getColleges
}) => {
  const [current, setCurrent] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [collegeFilter, setCollegeFilter] = useState('');

  useEffect(() => {
    getCourses();
    getColleges();
  }, [getCourses, getColleges]);

  const toggleForm = () => {
    setFormVisible(!formVisible);
    if (current) setCurrent(null);
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCollege = collegeFilter === '' || course.college._id === collegeFilter;
    
    return matchesSearch && matchesCollege;
  });

  return (
    <section className="container">
      <h1 className="large text-primary">Manage Courses</h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add and manage courses
      </p>

      <div className="mb-4">
        <button
          onClick={toggleForm}
          className="btn btn-primary"
        >
          {formVisible ? 'Close Form' : 'Add Course'}
        </button>
      </div>

      {formVisible && (
        <CourseForm
          current={current}
          setCurrent={setCurrent}
          setFormVisible={setFormVisible}
        />
      )}

      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <select
            className="form-control"
            value={collegeFilter}
            onChange={e => setCollegeFilter(e.target.value)}
          >
            <option value="">All Colleges</option>
            {colleges.map(college => (
              <option key={college._id} value={college._id}>
                {college.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div>
          {filteredCourses.length > 0 ? (
            filteredCourses.map(course => (
              <CourseItem
                key={course._id}
                course={course}
                setCurrent={setCurrent}
                setFormVisible={setFormVisible}
              />
            ))
          ) : (
            <p>No courses found</p>
          )}
        </div>
      )}
    </section>
  );
};

Courses.propTypes = {
  course: PropTypes.object.isRequired,
  college: PropTypes.object.isRequired,
  getCourses: PropTypes.func.isRequired,
  getColleges: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  course: state.course,
  college: state.college
});

export default connect(mapStateToProps, { getCourses, getColleges })(Courses);