import {
  GET_COLLEGES,
  GET_COLLEGE,
  ADD_COLLEGE,
  UPDATE_COLLEGE,
  DELETE_COLLEGE,
  COLLEGE_ERROR,
  CLEAR_COLLEGE,
  SET_LOADING
} from '../actions/types';

const initialState = {
  colleges: [],
  college: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_COLLEGES:
      return {
        ...state,
        colleges: payload,
        loading: false
      };
    case GET_COLLEGE:
      return {
        ...state,
        college: payload,
        loading: false
      };
    case ADD_COLLEGE:
      return {
        ...state,
        colleges: [payload, ...state.colleges],
        loading: false
      };
    case UPDATE_COLLEGE:
      return {
        ...state,
        colleges: state.colleges.map(college =>
          college._id === payload._id ? payload : college
        ),
        loading: false
      };
    case DELETE_COLLEGE:
      return {
        ...state,
        colleges: state.colleges.filter(college => college._id !== payload),
        loading: false
      };
    case COLLEGE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_COLLEGE:
      return {
        ...state,
        college: null,
        loading: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}