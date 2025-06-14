import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPaper, updatePaper } from '../../actions/paperActions';
import { getCourses } from '../../actions/courseActions';
import { getSemesters } from '../../actions/semesterActions';
import { getSubjects } from '../../actions/subjectActions';

const PaperForm = ({
  addPaper,
  updatePaper,
  getCourses,
  getSemesters,
  getSubjects,
  course: { courses, loading: courseLoading },
  semester: { semesters, loading: semesterLoading },
  subject: { subjects, loading: subjectLoading },
  current,
  setCurrent,
  setFormVisible
}) => {
  const [formData, setFormData] = useState({
    title: '',
    year: '',
    examType: '',
    subject: '',
    semester: '',
    course: '',
    file: null
  });

  const [filteredSemesters, setFilteredSemesters] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [fileError, setFileError] = useState('');

  useEffect(() => {
    getCourses();
    getSemesters();
    getSubjects();
  }, [getCourses, getSemesters, getSubjects]);

  useEffect(() => {
    if (current) {
      setFormData({
        title: current.title || '',
        year: current.year || '',
        examType: current.examType || '',
        subject: current.subject._id || current.subject || '',
        semester: current.semester._id || current.semester || '',
        course: current.course._id || current.course || '',
        file: null
      });
    }
  }, [current]);

  useEffect(() => {
    if (formData.course) {
      setFilteredSemesters(
        semesters.filter(semester => semester.course._id === formData.course)
      );
    } else {
      setFilteredSemesters([]);
    }
  }, [formData.course, semesters]);

  useEffect(() => {
    if (formData.semester) {
      setFilteredSubjects(
        subjects.filter(subject => subject.semester._id === formData.semester)
      );
    } else {
      setFilteredSubjects([]);
    }
  }, [formData.semester, subjects]);

  const { title, year, examType, subject, semester, course, file } = formData;

  const onChange = e => {
    const { name, value, files } = e.target;
    
    if (name === 'file') {
      const selectedFile = files[0];
      if (selectedFile) {
        // Check file type (PDF only)
        if (selectedFile.type !== 'application/pdf') {
          setFileError('Please upload PDF files only');
          return;
        }
        
        // Check file size (max 5MB)
        if (selectedFile.size > 5 * 1024 * 1024) {
          setFileError('File size should not exceed 5MB');
          return;
        }
        
        setFileError('');
        setFormData({ ...formData, file: selectedFile });
      }
    } else if (name === 'course') {
      setFormData({
        ...formData,
        [name]: value,
        semester: '',
        subject: ''
      });
    } else if (name === 'semester') {
      setFormData({
        ...formData,
        [name]: value,
        subject: ''
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    
    // For update without changing file
    if (current && !file) {
      updatePaper(current._id, {
        title,
        year,
        examType,
        subject,
        semester,
        course
      });
      setCurrent(null);
      setFormVisible(false);
      return;
    }
    
    // Check if file is selected for new paper
    if (!current && !file) {
      setFileError('Please select a PDF file');
      return;
    }
    
    const paperData = new FormData();
    paperData.append('title', title);
    paperData.append('year', year);
    paperData.append('examType', examType);
    paperData.append('subject', subject);
    paperData.append('semester', semester);
    paperData.append('course', course);
    if (file) paperData.append('file', file);
    
    if (current) {
      updatePaper(current._id, paperData);
      setCurrent(null);
    } else {
      addPaper(paperData);
    }
    
    setFormData({
      title: '',
      year: '',
      examType: '',
      subject: '',
      semester: '',
      course: '',
      file: null
    });
    setFormVisible(false);
  };

  const clearForm = () => {
    setCurrent(null);
    setFormData({
      title: '',
      year: '',
      examType: '',
      subject: '',
      semester: '',
      course: '',
      file: null
    });
    setFileError('');
    setFormVisible(false);
  };

  // Generate year options (last 20 years)
  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let i = 0; i < 20; i++) {
    yearOptions.push(currentYear - i);
  }

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h3>{current ? 'Edit Paper' : 'Add Paper'}</h3>
      </div>
      <div className="card-body">
        <form onSubmit={onSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="title">Paper Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={title}
              onChange={onChange}
              required
            />
          </div>
          
          <div className="form-group mb-3">
            <label htmlFor="year">Year</label>
            <select
              className="form-control"
              id="year"
              name="year"
              value={year}
              onChange={onChange}
              required
            >
              <option value="">Select Year</option>
              {yearOptions.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group mb-3">
            <label htmlFor="examType">Exam Type</label>
            <select
              className="form-control"
              id="examType"
              name="examType"
              value={examType}
              onChange={onChange}
              required
            >
              <option value="">Select Exam Type</option>
              <option value="Mid Term">Mid Term</option>
              <option value="End Term">End Term</option>
              <option value="Supplementary">Supplementary</option>
              <option value="Practice">Practice</option>
              <option value="Other">Other</option>
            </select>
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
                    {course.name} ({course.college.name})
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
              {!semesterLoading &&
                filteredSemesters.map(semester => (
                  <option key={semester._id} value={semester._id}>
                    {semester.name} (Semester {semester.number})
                  </option>
                ))}
            </select>
            {!course && (
              <small className="form-text text-muted">
                Please select a course first
              </small>
            )}
          </div>
          
          <div className="form-group mb-3">
            <label htmlFor="subject">Subject</label>
            <select
              className="form-control"
              id="subject"
              name="subject"
              value={subject}
              onChange={onChange}
              required
              disabled={!semester}
            >
              <option value="">Select Subject</option>
              {!subjectLoading &&
                filteredSubjects.map(subject => (
                  <option key={subject._id} value={subject._id}>
                    {subject.name} ({subject.code})
                  </option>
                ))}
            </select>
            {!semester && (
              <small className="form-text text-muted">
                Please select a semester first
              </small>
            )}
          </div>
          
          <div className="form-group mb-3">
            <label htmlFor="file">Upload PDF File {current && '(Leave empty to keep current file)'}</label>
            <input
              type="file"
              className={`form-control ${fileError ? 'is-invalid' : ''}`}
              id="file"
              name="file"
              onChange={onChange}
              accept="application/pdf"
              required={!current}
            />
            {fileError && (
              <div className="invalid-feedback">{fileError}</div>
            )}
            <small className="form-text text-muted">
              Only PDF files are allowed (max 5MB)
            </small>
          </div>
          
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">
              {current ? 'Update Paper' : 'Add Paper'}
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

PaperForm.propTypes = {
  addPaper: PropTypes.func.isRequired,
  updatePaper: PropTypes.func.isRequired,
  getCourses: PropTypes.func.isRequired,
  getSemesters: PropTypes.func.isRequired,
  getSubjects: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
  semester: PropTypes.object.isRequired,
  subject: PropTypes.object.isRequired,
  current: PropTypes.object,
  setCurrent: PropTypes.func.isRequired,
  setFormVisible: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  course: state.course,
  semester: state.semester,
  subject: state.subject
});

export default connect(mapStateToProps, {
  addPaper,
  updatePaper,
  getCourses,
  getSemesters,
  getSubjects
})(PaperForm);