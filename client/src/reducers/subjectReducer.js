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
} from '../actions/types';

const initialState = {
  subjects: [],
  subject: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SUBJECTS:
    case GET_SEMESTER_SUBJECTS:
    case GET_COURSE_SUBJECTS:
      return {
        ...state,
        subjects: payload,
        loading: false
      };
    case GET_SUBJECT:
      return {
        ...state,
        subject: payload,
        loading: false
      };
    case ADD_SUBJECT:
      return {
        ...state,
        subjects: [payload, ...state.subjects],
        loading: false
      };
    case UPDATE_SUBJECT:
      return {
        ...state,
        subjects: state.subjects.map(subject =>
          subject._id === payload._id ? payload : subject
        ),
        loading: false
      };
    case DELETE_SUBJECT:
      return {
        ...state,
        subjects: state.subjects.filter(subject => subject._id !== payload),
        loading: false
      };
    case SUBJECT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_SUBJECT:
      return {
        ...state,
        subject: null,
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