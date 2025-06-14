import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deletePaper, downloadPaper } from '../../actions/paperActions';

const PaperItem = ({
  paper,
  deletePaper,
  downloadPaper,
  setCurrent,
  setFormVisible,
  isAdmin = true
}) => {
  const { _id, title, year, examType, subject, semester, course, createdAt } = paper;

  const onEdit = () => {
    setCurrent(paper);
    setFormVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onDownload = () => {
    downloadPaper(_id);
  };

  // Format date
  const formatDate = date => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h4 className="card-title">{title}</h4>
        <div className="card-subtitle mb-2">
          <span className="badge bg-primary me-2">{examType}</span>
          <span className="badge bg-secondary">{year}</span>
        </div>
        
        <div className="row mt-3">
          <div className="col-md-6">
            <p className="card-text">
              <strong>Subject:</strong> {subject.name} ({subject.code})
            </p>
            <p className="card-text">
              <strong>Semester:</strong> {semester.name} (Semester {semester.number})
            </p>
          </div>
          <div className="col-md-6">
            <p className="card-text">
              <strong>Course:</strong> {course.name}
            </p>
            <p className="card-text">
              <strong>College:</strong> {course.college.name}
            </p>
          </div>
        </div>
        
        <p className="card-text text-muted mt-2">
          <small>Added on {formatDate(createdAt)}</small>
        </p>
        
        <div className="d-flex justify-content-end">
          <button
            onClick={onDownload}
            className="btn btn-success btn-sm me-2"
          >
            <i className="fas fa-download"></i> Download
          </button>
          
          {isAdmin && (
            <>
              <button
                onClick={onEdit}
                className="btn btn-primary btn-sm me-2"
              >
                <i className="fas fa-edit"></i> Edit
              </button>
              <button
                onClick={() => deletePaper(_id)}
                className="btn btn-danger btn-sm"
              >
                <i className="fas fa-trash"></i> Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

PaperItem.propTypes = {
  paper: PropTypes.object.isRequired,
  deletePaper: PropTypes.func.isRequired,
  downloadPaper: PropTypes.func.isRequired,
  setCurrent: PropTypes.func,
  setFormVisible: PropTypes.func,
  isAdmin: PropTypes.bool
};

export default connect(null, { deletePaper, downloadPaper })(PaperItem);