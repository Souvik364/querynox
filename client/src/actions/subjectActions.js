import axios from 'axios';
import { setAlert } from './alertActions';
import {
  GET_SUBJECTS,
  GET_SUBJECT,
  GET_SEMESTER_SUBJECTS,
  GET_COURSE_SUBJECTS,
  ADD_SUBJECT,
  UPDATE_SUBJECT,
  DELETE_SUBJECT,
  SUBJECT_ERROR,
  CLEAR_SUBJECT,
  SET_LOADING
} from './types';

// Get all subjects
export const getSubjects = () => async dispatch => {
  dispatch({ type: SET_LOADING });

  try {
    const res = await axios.get('/api/subjects');

    dispatch({
      type: GET_SUBJECTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SUBJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get subject by ID
export const getSubject = id => async dispatch => {
  dispatch({ type: SET_LOADING });

  try {
    const res = await axios.get(`/api/subjects/${id}`);

    dispatch({
      type: GET_SUBJECT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SUBJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get subjects by semester ID
export const getSemesterSubjects = semesterId => async dispatch => {
  dispatch({ type: SET_LOADING });

  try {
    const res = await axios.get(`/api/subjects/semester/${semesterId}`);

    dispatch({
      type: GET_SEMESTER_SUBJECTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SUBJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get subjects by course ID
export const getCourseSubjects = courseId => async dispatch => {
  dispatch({ type: SET_LOADING });

  try {
    const res = await axios.get(`/api/subjects/course/${courseId}`);

    dispatch({
      type: GET_COURSE_SUBJECTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SUBJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add subject
export const addSubject = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/subjects', formData, config);

    dispatch({
      type: ADD_SUBJECT,
      payload: res.data
    });

    dispatch(setAlert('Subject Added', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: SUBJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update subject
export const updateSubject = (id, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.put(`/api/subjects/${id}`, formData, config);

    dispatch({
      type: UPDATE_SUBJECT,
      payload: res.data
    });

    dispatch(setAlert('Subject Updated', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: SUBJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete subject
export const deleteSubject = id => async dispatch => {
  if (window.confirm('Are you sure? This cannot be undone!')) {
    try {
      await axios.delete(`/api/subjects/${id}`);

      dispatch({
        type: DELETE_SUBJECT,
        payload: id
      });

      dispatch(setAlert('Subject Removed', 'success'));
    } catch (err) {
      dispatch({
        type: SUBJECT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};

// Clear subject
export const clearSubject = () => dispatch => {
  dispatch({ type: CLEAR_SUBJECT });
};