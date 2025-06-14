import axios from 'axios';
import { setAlert } from './alertActions';
import {
  GET_COLLEGES,
  GET_COLLEGE,
  ADD_COLLEGE,
  UPDATE_COLLEGE,
  DELETE_COLLEGE,
  COLLEGE_ERROR,
  CLEAR_COLLEGE,
  SET_LOADING
} from './types';

// Get all colleges
export const getColleges = () => async dispatch => {
  dispatch({ type: SET_LOADING });

  try {
    const res = await axios.get('/api/colleges');

    dispatch({
      type: GET_COLLEGES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COLLEGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get college by ID
export const getCollege = id => async dispatch => {
  dispatch({ type: SET_LOADING });

  try {
    const res = await axios.get(`/api/colleges/${id}`);

    dispatch({
      type: GET_COLLEGE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COLLEGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add college
export const addCollege = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/colleges', formData, config);

    dispatch({
      type: ADD_COLLEGE,
      payload: res.data
    });

    dispatch(setAlert('College Added', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: COLLEGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update college
export const updateCollege = (id, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.put(`/api/colleges/${id}`, formData, config);

    dispatch({
      type: UPDATE_COLLEGE,
      payload: res.data
    });

    dispatch(setAlert('College Updated', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: COLLEGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete college
export const deleteCollege = id => async dispatch => {
  if (window.confirm('Are you sure? This cannot be undone!')) {
    try {
      await axios.delete(`/api/colleges/${id}`);

      dispatch({
        type: DELETE_COLLEGE,
        payload: id
      });

      dispatch(setAlert('College Removed', 'success'));
    } catch (err) {
      dispatch({
        type: COLLEGE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};

// Clear college
export const clearCollege = () => dispatch => {
  dispatch({ type: CLEAR_COLLEGE });
};