import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteSemester } from '../../actions/semesterActions';

const SemesterItem = ({ semester, deleteSemester, setCurrent, setFormVisible }) => {
  const { _id, name, number, course, year } = semester;

  const onEdit = () => {
    setCurrent(semester);
    setFormVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h4 className="card-title">{name}</h4>
        <h6 className="card-subtitle mb-2 text-muted">Semester {number}</h6>
        <p className="card-text">
          <strong>Course:</strong> {course.name}
        </p>
        <p className="card-text">
          <strong>College:</strong> {course.college.name}
        </p>
        <p className="card-text">
          <strong>Year:</strong> {year}
        </p>
        <div className="d-flex justify-content-end">
          <button
            onClick={onEdit}
            className="btn btn-primary btn-sm me-2"
          >
            <i className="fas fa-edit"></i> Edit
          </button>
          <button
            onClick={() => deleteSemester(_id)}
            className="btn btn-danger btn-sm"
          >
            <i className="fas fa-trash"></i> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

SemesterItem.propTypes = {
  semester: PropTypes.object.isRequired,
  deleteSemester: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  setFormVisible: PropTypes.func.isRequired
};

export default connect(null, { deleteSemester })(SemesterItem);