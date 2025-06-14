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
} from '../actions/types';

const initialState = {
  courses: [],
  course: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_COURSES:
    case GET_COLLEGE_COURSES:
      return {
        ...state,
        courses: payload,
        loading: false
      };
    case GET_COURSE:
      return {
        ...state,
        course: payload,
        loading: false
      };
    case ADD_COURSE:
      return {
        ...state,
        courses: [payload, ...state.courses],
        loading: false
      };
    case UPDATE_COURSE:
      return {
        ...state,
        courses: state.courses.map(course =>
          course._id === payload._id ? payload : course
        ),
        loading: false
      };
    case DELETE_COURSE:
      return {
        ...state,
        courses: state.courses.filter(course => course._id !== payload),
        loading: false
      };
    case COURSE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_COURSE:
      return {
        ...state,
        course: null,
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