import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPapers } from '../../actions/paperActions';
import { getCourses } from '../../actions/courseActions';
import { getSemesters } from '../../actions/semesterActions';
import { getSubjects } from '../../actions/subjectActions';
import PaperItem from './PaperItem';
import Spinner from '../layout/Spinner';

const BrowsePapers = ({
  paper: { papers, loading },
  course: { courses },
  semester: { semesters },
  subject: { subjects },
  getPapers,
  getCourses,
  getSemesters,
  getSubjects
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    course: '',
    semester: '',
    subject: '',
    year: '',
    examType: ''
  });
  const [filteredSemesters, setFilteredSemesters] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);

  useEffect(() => {
    getPapers();
    getCourses();
    getSemesters();
    getSubjects();
  }, [getPapers, getCourses, getSemesters, getSubjects]);

  useEffect(() => {
    if (filters.course) {
      setFilteredSemesters(
        semesters.filter(semester => semester.course._id === filters.course)
      );
      setFilters(prev => ({ ...prev, semester: '', subject: '' }));
    } else {
      setFilteredSemesters([]);
      setFilters(prev => ({ ...prev, semester: '', subject: '' }));
    }
  }, [filters.course, semesters]);

  useEffect(() => {
    if (filters.semester) {
      setFilteredSubjects(
        subjects.filter(subject => subject.semester._id === filters.semester)
      );
      setFilters(prev => ({ ...prev, subject: '' }));
    } else {
      setFilteredSubjects([]);
      setFilters(prev => ({ ...prev, subject: '' }));
    }
  }, [filters.semester, subjects]);

  const handleFilterChange = e => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({
      course: '',
      semester: '',
      subject: '',
      year: '',
      examType: ''
    });
    setSearchTerm('');
  };

  // Generate year options (last 20 years)
  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let i = 0; i < 20; i++) {
    yearOptions.push(currentYear - i);
  }

  const filteredPapers = papers.filter(paper => {
    const matchesSearch =
      paper.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCourse = filters.course === '' || paper.course._id === filters.course;
    const matchesSemester = filters.semester === '' || paper.semester._id === filters.semester;
    const matchesSubject = filters.subject === '' || paper.subject._id === filters.subject;
    const matchesYear = filters.year === '' || paper.year.toString() === filters.year;
    const matchesExamType = filters.examType === '' || paper.examType === filters.examType;
    
    return matchesSearch && matchesCourse && matchesSemester && matchesSubject && matchesYear && matchesExamType;
  });

  return (
    <section className="container">
      <h1 className="large text-primary">Browse Question Papers</h1>
      <p className="lead">
        <i className="fas fa-search"></i> Find and download previous year question papers
      </p>

      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Search & Filter</h4>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-12">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="row mb-3">
            <div className="col-md-4 mb-3">
              <label htmlFor="courseFilter">Course</label>
              <select
                className="form-control"
                id="courseFilter"
                name="course"
                value={filters.course}
                onChange={handleFilterChange}
              >
                <option value="">All Courses</option>
                {courses.map(course => (
                  <option key={course._id} value={course._id}>
                    {course.name} ({course.college.name})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="col-md-4 mb-3">
              <label htmlFor="semesterFilter">Semester</label>
              <select
                className="form-control"
                id="semesterFilter"
                name="semester"
                value={filters.semester}
                onChange={handleFilterChange}
                disabled={!filters.course}
              >
                <option value="">All Semesters</option>
                {filteredSemesters.map(semester => (
                  <option key={semester._id} value={semester._id}>
                    {semester.name} (Semester {semester.number})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="col-md-4 mb-3">
              <label htmlFor="subjectFilter">Subject</label>
              <select
                className="form-control"
                id="subjectFilter"
                name="subject"
                value={filters.subject}
                onChange={handleFilterChange}
                disabled={!filters.semester}
              >
                <option value="">All Subjects</option>
                {filteredSubjects.map(subject => (
                  <option key={subject._id} value={subject._id}>
                    {subject.name} ({subject.code})
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="row mb-3">
            <div className="col-md-6 mb-3">
              <label htmlFor="yearFilter">Year</label>
              <select
                className="form-control"
                id="yearFilter"
                name="year"
                value={filters.year}
                onChange={handleFilterChange}
              >
                <option value="">All Years</option>
                {yearOptions.map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="col-md-6 mb-3">
              <label htmlFor="examTypeFilter">Exam Type</label>
              <select
                className="form-control"
                id="examTypeFilter"
                name="examType"
                value={filters.examType}
                onChange={handleFilterChange}
              >
                <option value="">All Exam Types</option>
                <option value="Mid Term">Mid Term</option>
                <option value="End Term">End Term</option>
                <option value="Supplementary">Supplementary</option>
                <option value="Practice">Practice</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          
          <div className="d-flex justify-content-end">
            <button
              onClick={resetFilters}
              className="btn btn-secondary"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Found {filteredPapers.length} papers</h4>
          </div>
          
          {filteredPapers.length > 0 ? (
            <div className="row">
              {filteredPapers.map(paper => (
                <div className="col-lg-6" key={paper._id}>
                  <PaperItem
                    paper={paper}
                    isAdmin={false}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <i className="fas fa-search fa-3x mb-3 text-muted"></i>
              <p className="lead">No papers found matching your criteria</p>
              <p>Try adjusting your filters or search term</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

BrowsePapers.propTypes = {
  paper: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
  semester: PropTypes.object.isRequired,
  subject: PropTypes.object.isRequired,
  getPapers: PropTypes.func.isRequired,
  getCourses: PropTypes.func.isRequired,
  getSemesters: PropTypes.func.isRequired,
  getSubjects: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  paper: state.paper,
  course: state.course,
  semester: state.semester,
  subject: state.subject
});

export default connect(mapStateToProps, {
  getPapers,
  getCourses,
  getSemesters,
  getSubjects
})(BrowsePapers);