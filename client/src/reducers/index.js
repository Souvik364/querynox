import { combineReducers } from 'redux';
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import collegeReducer from './collegeReducer';
import courseReducer from './courseReducer';
import semesterReducer from './semesterReducer';
import subjectReducer from './subjectReducer';
import paperReducer from './paperReducer';

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  college: collegeReducer,
  course: courseReducer,
  semester: semesterReducer,
  subject: subjectReducer,
  paper: paperReducer
});