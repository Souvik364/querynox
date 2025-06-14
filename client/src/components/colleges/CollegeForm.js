import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addCollege, updateCollege } from '../../actions/collegeActions';

const CollegeForm = ({
  addCollege,
  updateCollege,
  current,
  setCurrent,
  setFormVisible
}) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    location: ''
  });

  useEffect(() => {
    if (current) {
      setFormData({
        name: current.name || '',
        code: current.code || '',
        location: current.location || ''
      });
    }
  }, [current]);

  const { name, code, location } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current) {
      updateCollege(current._id, formData);
      setCurrent(null);
    } else {
      addCollege(formData);
    }
    setFormData({
      name: '',
      code: '',
      location: ''
    });
    setFormVisible(false);
  };

  const clearForm = () => {
    setCurrent(null);
    setFormData({
      name: '',
      code: '',
      location: ''
    });
    setFormVisible(false);
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h3>{current ? 'Edit College' : 'Add College'}</h3>
      </div>
      <div className="card-body">
        <form onSubmit={onSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="name">College Name</label>
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
            <label htmlFor="code">College Code</label>
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
            <label htmlFor="location">Location</label>
            <input
              type="text"
              className="form-control"
              id="location"
              name="location"
              value={location}
              onChange={onChange}
              required
            />
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">
              {current ? 'Update College' : 'Add College'}
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

CollegeForm.propTypes = {
  addCollege: PropTypes.func.isRequired,
  updateCollege: PropTypes.func.isRequired,
  current: PropTypes.object,
  setCurrent: PropTypes.func.isRequired,
  setFormVisible: PropTypes.func.isRequired
};

export default connect(null, { addCollege, updateCollege })(CollegeForm);