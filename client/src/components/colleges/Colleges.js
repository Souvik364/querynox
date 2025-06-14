import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getColleges } from '../../actions/collegeActions';
import CollegeItem from './CollegeItem';
import CollegeForm from './CollegeForm';
import Spinner from '../layout/Spinner';

const Colleges = ({ college: { colleges, loading }, getColleges }) => {
  const [current, setCurrent] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getColleges();
  }, [getColleges]);

  const toggleForm = () => {
    setFormVisible(!formVisible);
    if (current) setCurrent(null);
  };

  const filteredColleges = colleges.filter(
    college =>
      college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="container">
      <h1 className="large text-primary">Manage Colleges</h1>
      <p className="lead">
        <i className="fas fa-university"></i> Add and manage colleges
      </p>

      <div className="mb-4">
        <button
          onClick={toggleForm}
          className="btn btn-primary"
        >
          {formVisible ? 'Close Form' : 'Add College'}
        </button>
      </div>

      {formVisible && (
        <CollegeForm
          current={current}
          setCurrent={setCurrent}
          setFormVisible={setFormVisible}
        />
      )}

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search colleges..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div>
          {filteredColleges.length > 0 ? (
            filteredColleges.map(college => (
              <CollegeItem
                key={college._id}
                college={college}
                setCurrent={setCurrent}
                setFormVisible={setFormVisible}
              />
            ))
          ) : (
            <p>No colleges found</p>
          )}
        </div>
      )}
    </section>
  );
};

Colleges.propTypes = {
  college: PropTypes.object.isRequired,
  getColleges: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  college: state.college
});

export default connect(mapStateToProps, { getColleges })(Colleges);