import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteSubject } from '../../actions/subjectActions';

const SubjectItem = ({ subject, deleteSubject, setCurrent, setFormVisible }) => {
  const { _id, name, code, semester, course, credits } = subject;

  const onEdit = () => {
    setCurrent(subject);
    setFormVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h4 className="card-title">{name}</h4>
        <h6 className="card-subtitle mb-2 text-muted">Code: {code}</h6>
        <p className="card-text">
          <strong>Course:</strong> {course.name}
        </p>
        <p className="card-text">
          <strong>College:</strong> {course.college.name}
        </p>
        <p className="card-text">
          <strong>Semester:</strong> {semester.name} (Semester {semester.number})
        </p>
        <p className="card-text">
          <strong>Credits:</strong> {credits}
        </p>
        <div className="d-flex justify-content-end">
          <button
            onClick={onEdit}
            className="btn btn-primary btn-sm me-2"
          >
            <i className="fas fa-edit"></i> Edit
          </button>
          <button
            onClick={() => deleteSubject(_id)}
            className="btn btn-danger btn-sm"
          >
            <i className="fas fa-trash"></i> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

SubjectItem.propTypes = {
  subject: PropTypes.object.isRequired,
  deleteSubject: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  setFormVisible: PropTypes.func.isRequired
};

export default connect(null, { deleteSubject })(SubjectItem);