import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSemesters } from '../../actions/semesterActions';
import { getCourses } from '../../actions/courseActions';
import SemesterItem from './SemesterItem';
import SemesterForm from './SemesterForm';
import Spinner from '../layout/Spinner';

const Semesters = ({
  semester: { semesters, loading },
  course: { courses },
  getSemesters,
  getCourses
}) => {
  const [current, setCurrent] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('');

  useEffect(() => {
    getSemesters();
    getCourses();
  }, [getSemesters, getCourses]);

  const toggleForm = () => {
    setFormVisible(!formVisible);
    if (current) setCurrent(null);
  };

  const filteredSemesters = semesters.filter(semester => {
    const matchesSearch =
      semester.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      semester.number.toString().includes(searchTerm);
    
    const matchesCourse = courseFilter === '' || semester.course._id === courseFilter;
    
    return matchesSearch && matchesCourse;
  });

  return (
    <section className="container">
      <h1 className="large text-primary">Manage Semesters</h1>
      <p className="lead">
        <i className="fas fa-calendar-alt"></i> Add and manage semesters
      </p>

      <div className="mb-4">
        <button
          onClick={toggleForm}
          className="btn btn-primary"
        >
          {formVisible ? 'Close Form' : 'Add Semester'}
        </button>
      </div>

      {formVisible && (
        <SemesterForm
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
            placeholder="Search semesters..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <select
            className="form-control"
            value={courseFilter}
            onChange={e => setCourseFilter(e.target.value)}
          >
            <option value="">All Courses</option>
            {courses.map(course => (
              <option key={course._id} value={course._id}>
                {course.name} ({course.college.name})
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div>
          {filteredSemesters.length > 0 ? (
            filteredSemesters.map(semester => (
              <SemesterItem
                key={semester._id}
                semester={semester}
                setCurrent={setCurrent}
                setFormVisible={setFormVisible}
              />
            ))
          ) : (
            <p>No semesters found</p>
          )}
        </div>
      )}
    </section>
  );
};

Semesters.propTypes = {
  semester: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
  getSemesters: PropTypes.func.isRequired,
  getCourses: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  semester: state.semester,
  course: state.course
});

export default connect(mapStateToProps, { getSemesters, getCourses })(Semesters);