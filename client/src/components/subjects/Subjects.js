import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSubjects } from '../../actions/subjectActions';
import { getCourses } from '../../actions/courseActions';
import { getSemesters } from '../../actions/semesterActions';
import SubjectItem from './SubjectItem';
import SubjectForm from './SubjectForm';
import Spinner from '../layout/Spinner';

const Subjects = ({
  subject: { subjects, loading },
  course: { courses },
  semester: { semesters },
  getSubjects,
  getCourses,
  getSemesters
}) => {
  const [current, setCurrent] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [semesterFilter, setSemesterFilter] = useState('');
  const [filteredSemesters, setFilteredSemesters] = useState([]);

  useEffect(() => {
    getSubjects();
    getCourses();
    getSemesters();
  }, [getSubjects, getCourses, getSemesters]);

  useEffect(() => {
    if (courseFilter) {
      setFilteredSemesters(
        semesters.filter(semester => semester.course._id === courseFilter)
      );
      setSemesterFilter('');
    } else {
      setFilteredSemesters([]);
      setSemesterFilter('');
    }
  }, [courseFilter, semesters]);

  const toggleForm = () => {
    setFormVisible(!formVisible);
    if (current) setCurrent(null);
  };

  const filteredSubjects = subjects.filter(subject => {
    const matchesSearch =
      subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.code.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCourse = courseFilter === '' || subject.course._id === courseFilter;
    const matchesSemester = semesterFilter === '' || subject.semester._id === semesterFilter;
    
    return matchesSearch && matchesCourse && matchesSemester;
  });

  return (
    <section className="container">
      <h1 className="large text-primary">Manage Subjects</h1>
      <p className="lead">
        <i className="fas fa-book"></i> Add and manage subjects
      </p>

      <div className="mb-4">
        <button
          onClick={toggleForm}
          className="btn btn-primary"
        >
          {formVisible ? 'Close Form' : 'Add Subject'}
        </button>
      </div>

      {formVisible && (
        <SubjectForm
          current={current}
          setCurrent={setCurrent}
          setFormVisible={setFormVisible}
        />
      )}

      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search subjects..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-4 mb-3">
          <select
            className="form-control"
            value={courseFilter}
            onChange={e => setCourseFilter(e.target.value)}
          >
            <option value="">All Courses</option>
            {courses.map(course => (
              <option key={course._id} value={course._id}>
                {course.name} ({course.college.name})
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <select
            className="form-control"
            value={semesterFilter}
            onChange={e => setSemesterFilter(e.target.value)}
            disabled={!courseFilter}
          >
            <option value="">All Semesters</option>
            {filteredSemesters.map(semester => (
              <option key={semester._id} value={semester._id}>
                {semester.name} (Semester {semester.number})
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div>
          {filteredSubjects.length > 0 ? (
            filteredSubjects.map(subject => (
              <SubjectItem
                key={subject._id}
                subject={subject}
                setCurrent={setCurrent}
                setFormVisible={setFormVisible}
              />
            ))
          ) : (
            <p>No subjects found</p>
          )}
        </div>
      )}
    </section>
  );
};

Subjects.propTypes = {
  subject: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
  semester: PropTypes.object.isRequired,
  getSubjects: PropTypes.func.isRequired,
  getCourses: PropTypes.func.isRequired,
  getSemesters: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  subject: state.subject,
  course: state.course,
  semester: state.semester
});

export default connect(mapStateToProps, {
  getSubjects,
  getCourses,
  getSemesters
})(Subjects);