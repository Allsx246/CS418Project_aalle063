import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';
import Profile from './Profile.jsx';
import LoginOTP from './LoginOTP.jsx';
import CourseHistory from './CourseHistory.jsx';
import PasswordReset from './PasswordReset.jsx';
import Header from './Header.jsx';
import NameChange from './NameChange.jsx';
import CourseForm from './CourseForm.jsx';
import Column from './Column.jsx';


function App() {

  return (
    
     <Router>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login-otp" element={<LoginOTP />} />
          <Route path="/courses" element={<CourseHistory />} />
          <Route path="/password-reset" element={<PasswordReset />} />
          <Route path="/name-change" element={<NameChange />} />
          <Route path="/course-form" element={<CourseForm />} />
          <Route path="/column" element={<Column />} />
        </Routes>
      </Router>
  )
}

export default App;
