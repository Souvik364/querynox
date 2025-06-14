import axios from 'axios';
import { setAlert } from './alertActions';
import {
  GET_COURSES,
  GET_COURSE,
  GET_COLLEGE_COURSES,
  ADD_COURSE,
  UPDATE_COURSE,
  DELETE_COURSE,
  COURSE_ERROR,
  CLEAR_COURSE,
  SET_LOADING
} from './types';

// Get all courses
export const getCourses = () => async dispatch => {
  dispatch({ type: SET_LOADING });

  try {
    const res = await axios.get('/api/courses');

    dispatch({
      type: GET_COURSES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get course by ID
export const getCourse = id => async dispatch => {
  dispatch({ type: SET_LOADING });

  try {
    const res = await axios.get(`/api/courses/${id}`);

    dispatch({
      type: GET_COURSE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get courses by college ID
export const getCollegeCourses = collegeId => async dispatch => {
  dispatch({ type: SET_LOADING });

  try {
    const res = await axios.get(`/api/courses/college/${collegeId}`);

    dispatch({
      type: GET_COLLEGE_COURSES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add course
export const addCourse = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/courses', formData, config);

    dispatch({
      type: ADD_COURSE,
      payload: res.data
    });

    dispatch(setAlert('Course Added', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update course
export const updateCourse = (id, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.put(`/api/courses/${id}`, formData, config);

    dispatch({
      type: UPDATE_COURSE,
      payload: res.data
    });

    dispatch(setAlert('Course Updated', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete course
export const deleteCourse = id => async dispatch => {
  if (window.confirm('Are you sure? This cannot be undone!')) {
    try {
      await axios.delete(`/api/courses/${id}`);

      dispatch({
        type: DELETE_COURSE,
        payload: id
      });

      dispatch(setAlert('Course Removed', 'success'));
    } catch (err) {
      dispatch({
        type: COURSE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};

// Clear course
export const clearCourse = () => dispatch => {
  dispatch({ type: CLEAR_COURSE });
};