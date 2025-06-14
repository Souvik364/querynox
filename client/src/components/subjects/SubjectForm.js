import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addSubject, updateSubject } from '../../actions/subjectActions';
import { getCourses } from '../../actions/courseActions';
import { getSemestersByCourse } from '../../actions/semesterActions';

const SubjectForm = ({
  addSubject,
  updateSubject,
  getCourses,
  getSemestersByCourse,
  course: { courses, loading: courseLoading },
  semester: { semesters, loading: semesterLoading },
  current,
  setCurrent,
  setFormVisible
}) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    course: '',
    semester: '',
    credits: ''
  });

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  useEffect(() => {
    if (current) {
      setFormData({
        name: current.name || '',
        code: current.code || '',
        course: current.course._id || current.course || '',
        semester: current.semester._id || current.semester || '',
        credits: current.credits || ''
      });

      if (current.course._id) {
        getSemestersByCourse(current.course._id);
      }
    }
  }, [current, getSemestersByCourse]);

  const { name, code, course, semester, credits } = formData;

  const onChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // If course changes, fetch related semesters
    if (name === 'course' && value) {
      getSemestersByCourse(value);
      // Reset semester selection when course changes
      setFormData(prev => ({ ...prev, [name]: value, semester: '' }));
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    if (current) {
      updateSubject(current._id, formData);
      setCurrent(null);
    } else {
      addSubject(formData);
    }
    setFormData({
      name: '',
      code: '',
      course: '',
      semester: '',
      credits: ''
    });
    setFormVisible(false);
  };

  const clearForm = () => {
    setCurrent(null);
    setFormData({
      name: '',
      code: '',
      course: '',
      semester: '',
      credits: ''
    });
    setFormVisible(false);
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h3>{current ? 'Edit Subject' : 'Add Subject'}</h3>
      </div>
      <div className="card-body">
        <form onSubmit={onSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="name">Subject Name</label>
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
            <label htmlFor="code">Subject Code</label>
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
                    {course.name} - {course.college.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="semester">Semester</label>
            <select
              className="form-control"
              id="semester"
              name="semester"
              value={semester}
              onChange={onChange}
              required
              disabled={!course}
            >
              <option value="">Select Semester</option>
              {!semesterLoading && course &&
                semesters.map(semester => (
                  <option key={semester._id} value={semester._id}>
                    {semester.name} (Semester {semester.number})
                  </option>
                ))}
            </select>
            {!course && <small className="text-muted">Please select a course first</small>}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="credits">Credits</label>
            <input
              type="number"
              className="form-control"
              id="credits"
              name="credits"
              value={credits}
              onChange={onChange}
              min="1"
              max="10"
              required
            />
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">
              {current ? 'Update Subject' : 'Add Subject'}
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

SubjectForm.propTypes = {
  addSubject: PropTypes.func.isRequired,
  updateSubject: PropTypes.func.isRequired,
  getCourses: PropTypes.func.isRequired,
  getSemestersByCourse: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
  semester: PropTypes.object.isRequired,
  current: PropTypes.object,
  setCurrent: PropTypes.func.isRequired,
  setFormVisible: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  course: state.course,
  semester: state.semester
});

export default connect(mapStateToProps, {
  addSubject,
  updateSubject,
  getCourses,
  getSemestersByCourse
})(SubjectForm);