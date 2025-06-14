import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteCollege } from '../../actions/collegeActions';

const CollegeItem = ({ college, deleteCollege, setCurrent, setFormVisible }) => {
  const { _id, name, code, location } = college;

  const onEdit = () => {
    setCurrent(college);
    setFormVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h4 className="card-title">{name}</h4>
        <h6 className="card-subtitle mb-2 text-muted">Code: {code}</h6>
        <p className="card-text">
          <i className="fas fa-map-marker-alt"></i> {location}
        </p>
        <div className="d-flex justify-content-end">
          <button
            onClick={onEdit}
            className="btn btn-primary btn-sm me-2"
          >
            <i className="fas fa-edit"></i> Edit
          </button>
          <button
            onClick={() => deleteCollege(_id)}
            className="btn btn-danger btn-sm"
          >
            <i className="fas fa-trash"></i> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

CollegeItem.propTypes = {
  college: PropTypes.object.isRequired,
  deleteCollege: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  setFormVisible: PropTypes.func.isRequired
};

export default connect(null, { deleteCollege })(CollegeItem);