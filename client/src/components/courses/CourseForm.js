import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addCourse, updateCourse } from '../../actions/courseActions';
import { getColleges } from '../../actions/collegeActions';

const CourseForm = ({
  addCourse,
  updateCourse,
  getColleges,
  college: { colleges, loading: collegeLoading },
  current,
  setCurrent,
  setFormVisible
}) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    college: '',
    duration: ''
  });

  useEffect(() => {
    getColleges();
  }, [getColleges]);

  useEffect(() => {
    if (current) {
      setFormData({
        name: current.name || '',
        code: current.code || '',
        college: current.college._id || current.college || '',
        duration: current.duration || ''
      });
    }
  }, [current]);

  const { name, code, college, duration } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current) {
      updateCourse(current._id, formData);
      setCurrent(null);
    } else {
      addCourse(formData);
    }
    setFormData({
      name: '',
      code: '',
      college: '',
      duration: ''
    });
    setFormVisible(false);
  };

  const clearForm = () => {
    setCurrent(null);
    setFormData({
      name: '',
      code: '',
      college: '',
      duration: ''
    });
    setFormVisible(false);
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h3>{current ? 'Edit Course' : 'Add Course'}</h3>
      </div>
      <div className="card-body">
        <form onSubmit={onSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="name">Course Name</label>
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
            <label htmlFor="code">Course Code</label>
            <input
              type="text"
              className="form-control"
              id="code"
              name="code"
              value={code}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="college">College</label>
            <select
              className="form-control"
              id="college"
              name="college"
              value={college}
              onChange={onChange}
              required
            >
              <option value="">Select College</option>
              {!collegeLoading &&
                colleges.map(college => (
                  <option key={college._id} value={college._id}>
                    {college.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="duration">Duration (in years)</label>
            <input
              type="number"
              className="form-control"
              id="duration"
              name="duration"
              value={duration}
              onChange={onChange}
              min="1"
              max="10"
              required
            />
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">
              {current ? 'Update Course' : 'Add Course'}
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

CourseForm.propTypes = {
  addCourse: PropTypes.func.isRequired,
  updateCourse: PropTypes.func.isRequired,
  getColleges: PropTypes.func.isRequired,
  college: PropTypes.object.isRequired,
  current: PropTypes.object,
  setCurrent: PropTypes.func.isRequired,
  setFormVisible: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  college: state.college
});

export default connect(mapStateToProps, { addCourse, updateCourse, getColleges })(
  CourseForm
);