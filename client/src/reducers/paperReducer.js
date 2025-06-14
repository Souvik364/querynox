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
} from '../actions/types';

const initialState = {
  papers: [],
  paper: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PAPERS:
    case GET_FILTERED_PAPERS:
      return {
        ...state,
        papers: payload,
        loading: false
      };
    case GET_PAPER:
      return {
        ...state,
        paper: payload,
        loading: false
      };
    case ADD_PAPER:
      return {
        ...state,
        papers: [payload, ...state.papers],
        loading: false
      };
    case UPDATE_PAPER:
      return {
        ...state,
        papers: state.papers.map(paper =>
          paper._id === payload._id ? payload : paper
        ),
        loading: false
      };
    case DELETE_PAPER:
      return {
        ...state,
        papers: state.papers.filter(paper => paper._id !== payload),
        loading: false
      };
    case PAPER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_PAPER:
      return {
        ...state,
        paper: null,
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