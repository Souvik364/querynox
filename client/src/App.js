import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Alert from './components/layout/Alert';
import Home from './components/pages/Home';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';

// Auth Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Dashboard
import Dashboard from './components/dashboard/Dashboard';

// College Components
import Colleges from './components/colleges/Colleges';

// Course Components
import Courses from './components/courses/Courses';

// Semester Components
import Semesters from './components/semesters/Semesters';

// Subject Components
import Subjects from './components/subjects/Subjects';

// Paper Components
import Papers from './components/papers/Papers';
import BrowsePapers from './components/papers/BrowsePapers';

// Private Route
import PrivateRoute from './components/routing/PrivateRoute';

// Actions
import { loadAdmin } from './actions/authActions';
import setAuthToken from './utils/setAuthToken';

// Check for token in localStorage
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadAdmin());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="App d-flex flex-column min-vh-100">
          <Navbar />
          <Alert />
          <div className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/papers" element={<BrowsePapers />} />
              
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Admin Dashboard Routes */}
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              
              {/* College Management Routes */}
              <Route path="/colleges" element={
                <PrivateRoute>
                  <Colleges />
                </PrivateRoute>
              } />
              
              {/* Course Management Routes */}
              <Route path="/courses" element={
                <PrivateRoute>
                  <Courses />
                </PrivateRoute>
              } />
              
              {/* Semester Management Routes */}
              <Route path="/semesters" element={
                <PrivateRoute>
                  <Semesters />
                </PrivateRoute>
              } />
              
              {/* Subject Management Routes */}
              <Route path="/subjects" element={
                <PrivateRoute>
                  <Subjects />
                </PrivateRoute>
              } />
              
              {/* Paper Management Routes */}
              <Route path="/manage-papers" element={
                <PrivateRoute>
                  <Papers />
                </PrivateRoute>
              } />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;