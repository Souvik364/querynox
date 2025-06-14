import axios from 'axios';
import { setAlert } from './alertActions';
import {
  GET_PAPERS,
  GET_PAPER,
  GET_FILTERED_PAPERS,
  ADD_PAPER,
  UPDATE_PAPER,
  DELETE_PAPER,
  PAPER_ERROR,
  CLEAR_PAPER,
  SET_LOADING
} from './types';

// Get all papers
export const getPapers = () => async dispatch => {
  dispatch({ type: SET_LOADING });

  try {
    const res = await axios.get('/api/papers');

    dispatch({
      type: GET_PAPERS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PAPER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get paper by ID
export const getPaper = id => async dispatch => {
  dispatch({ type: SET_LOADING });

  try {
    const res = await axios.get(`/api/papers/${id}`);

    dispatch({
      type: GET_PAPER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PAPER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get filtered papers
export const getFilteredPapers = (filters) => async dispatch => {
  dispatch({ type: SET_LOADING });

  try {
    // Build query string from filters
    const queryParams = new URLSearchParams();
    
    if (filters.college) queryParams.append('college', filters.college);
    if (filters.course) queryParams.append('course', filters.course);
    if (filters.year) queryParams.append('year', filters.year);
    if (filters.semester) queryParams.append('semester', filters.semester);
    if (filters.subject) queryParams.append('subject', filters.subject);
    
    const res = await axios.get(`/api/papers/filter?${queryParams.toString()}`);

    dispatch({
      type: GET_FILTERED_PAPERS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PAPER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add paper
export const addPaper = formData => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    const res = await axios.post('/api/papers', formData, config);

    dispatch({
      type: ADD_PAPER,
      payload: res.data
    });

    dispatch(setAlert('Paper Added', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PAPER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update paper
export const updatePaper = (id, formData) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    const res = await axios.put(`/api/papers/${id}`, formData, config);

    dispatch({
      type: UPDATE_PAPER,
      payload: res.data
    });

    dispatch(setAlert('Paper Updated', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PAPER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete paper
export const deletePaper = id => async dispatch => {
  if (window.confirm('Are you sure? This cannot be undone!')) {
    try {
      await axios.delete(`/api/papers/${id}`);

      dispatch({
        type: DELETE_PAPER,
        payload: id
      });

      dispatch(setAlert('Paper Removed', 'success'));
    } catch (err) {
      dispatch({
        type: PAPER_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};

// Download paper
export const downloadPaper = id => async () => {
  try {
    window.open(`/api/papers/download/${id}`, '_blank');
  } catch (err) {
    console.error('Download error:', err);
  }
};

// Clear paper
export const clearPaper = () => dispatch => {
  dispatch({ type: CLEAR_PAPER });
};