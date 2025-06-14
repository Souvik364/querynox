import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteCourse } from '../../actions/courseActions';

const CourseItem = ({ course, deleteCourse, setCurrent, setFormVisible }) => {
  const { _id, name, code, college, duration } = course;

  const onEdit = () => {
    setCurrent(course);
    setFormVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h4 className="card-title">{name}</h4>
        <h6 className="card-subtitle mb-2 text-muted">Code: {code}</h6>
        <p className="card-text">
          <strong>College:</strong> {college.name}
        </p>
        <p className="card-text">
          <strong>Duration:</strong> {duration} {duration === 1 ? 'year' : 'years'}
        </p>
        <div className="d-flex justify-content-end">
          <button
            onClick={onEdit}
            className="btn btn-primary btn-sm me-2"
          >
            <i className="fas fa-edit"></i> Edit
          </button>
          <button
            onClick={() => deleteCourse(_id)}
            className="btn btn-danger btn-sm"
          >
            <i className="fas fa-trash"></i> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

CourseItem.propTypes = {
  course: PropTypes.object.isRequired,
  deleteCourse: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  setFormVisible: PropTypes.func.isRequired
};

export default connect(null, { deleteCourse })(CourseItem);