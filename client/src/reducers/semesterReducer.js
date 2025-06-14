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
} from '../actions/types';

const initialState = {
  semesters: [],
  semester: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SEMESTERS:
    case GET_COURSE_SEMESTERS:
      return {
        ...state,
        semesters: payload,
        loading: false
      };
    case GET_SEMESTER:
      return {
        ...state,
        semester: payload,
        loading: false
      };
    case ADD_SEMESTER:
      return {
        ...state,
        semesters: [payload, ...state.semesters],
        loading: false
      };
    case UPDATE_SEMESTER:
      return {
        ...state,
        semesters: state.semesters.map(semester =>
          semester._id === payload._id ? payload : semester
        ),
        loading: false
      };
    case DELETE_SEMESTER:
      return {
        ...state,
        semesters: state.semesters.filter(semester => semester._id !== payload),
        loading: false
      };
    case SEMESTER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_SEMESTER:
      return {
        ...state,
        semester: null,
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