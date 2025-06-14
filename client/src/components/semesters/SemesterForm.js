import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addSemester, updateSemester } from '../../actions/semesterActions';
import { getCourses } from '../../actions/courseActions';

const SemesterForm = ({
  addSemester,
  updateSemester,
  getCourses,
  course: { courses, loading: courseLoading },
  current,
  setCurrent,
  setFormVisible
}) => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    course: '',
    year: ''
  });

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  useEffect(() => {
    if (current) {
      setFormData({
        name: current.name || '',
        number: current.number || '',
        course: current.course._id || current.course || '',
        year: current.year || ''
      });
    }
  }, [current]);

  const { name, number, course, year } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current) {
      updateSemester(current._id, formData);
      setCurrent(null);
    } else {
      addSemester(formData);
    }
    setFormData({
      name: '',
      number: '',
      course: '',
      year: ''
    });
    setFormVisible(false);
  };

  const clearForm = () => {
    setCurrent(null);
    setFormData({
      name: '',
      number: '',
      course: '',
      year: ''
    });
    setFormVisible(false);
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h3>{current ? 'Edit Semester' : 'Add Semester'}</h3>
      </div>
      <div className="card-body">
        <form onSubmit={onSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="name">Semester Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="number">Semester Number</label>
            <input
              type="number"
              className="form-control"
              id="number"
              name="number"
              value={number}
              onChange={onChange}
              min="1"
              max="12"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="course">Course</label>
            <select
              className="form-control"
              id="course"
              name="course"
              value={course}
              onChange={onChange}
              required
            >
              <option value="">Select Course</option>
              {!courseLoading &&
                courses.map(course => (
                  <option key={course._id} value={course._id}>
                    {course.name} ({course.college.name})
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="year">Year</label>
            <input
              type="number"
              className="form-control"
              id="year"
              name="year"
              value={year}
              onChange={onChange}
              min="1"
              max="6"
              required
            />
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">
              {current ? 'Update Semester' : 'Add Semester'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={clearForm}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

SemesterForm.propTypes = {
  addSemester: PropTypes.func.isRequired,
  updateSemester: PropTypes.func.isRequired,
  getCourses: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
  current: PropTypes.object,
  setCurrent: PropTypes.func.isRequired,
  setFormVisible: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  course: state.course
});

export default connect(mapStateToProps, {
  addSemester,
  updateSemester,
  getCourses
})(SemesterForm);