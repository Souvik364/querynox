import axios from 'axios';
import { setAlert } from './alertActions';
import {
  GET_SEMESTERS,
  GET_SEMESTER,
  GET_COURSE_SEMESTERS,
  ADD_SEMESTER,
  UPDATE_SEMESTER,
  DELETE_SEMESTER,
  SEMESTER_ERROR,
  CLEAR_SEMESTER,
  SET_LOADING
} from './types';

// Get all semesters
export const getSemesters = () => async dispatch => {
  dispatch({ type: SET_LOADING });

  try {
    const res = await axios.get('/api/semesters');

    dispatch({
      type: GET_SEMESTERS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SEMESTER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get semester by ID
export const getSemester = id => async dispatch => {
  dispatch({ type: SET_LOADING });

  try {
    const res = await axios.get(`/api/semesters/${id}`);

    dispatch({
      type: GET_SEMESTER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SEMESTER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get semesters by course ID
export const getCourseSemesters = courseId => async dispatch => {
  dispatch({ type: SET_LOADING });

  try {
    const res = await axios.get(`/api/semesters/course/${courseId}`);

    dispatch({
      type: GET_COURSE_SEMESTERS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SEMESTER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add semester
export const addSemester = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/semesters', formData, config);

    dispatch({
      type: ADD_SEMESTER,
      payload: res.data
    });

    dispatch(setAlert('Semester Added', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: SEMESTER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update semester
export const updateSemester = (id, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.put(`/api/semesters/${id}`, formData, config);

    dispatch({
      type: UPDATE_SEMESTER,
      payload: res.data
    });

    dispatch(setAlert('Semester Updated', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: SEMESTER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete semester
export const deleteSemester = id => async dispatch => {
  if (window.confirm('Are you sure? This cannot be undone!')) {
    try {
      await axios.delete(`/api/semesters/${id}`);

      dispatch({
        type: DELETE_SEMESTER,
        payload: id
      });

      dispatch(setAlert('Semester Removed', 'success'));
    } catch (err) {
      dispatch({
        type: SEMESTER_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};

// Clear semester
export const clearSemester = () => dispatch => {
  dispatch({ type: CLEAR_SEMESTER });
};