import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';
import Profile from './Profile.jsx';
import LoginOTP from './LoginOTP.jsx';


function App() {

  return (
    
     <Router>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login-otp" element={<LoginOTP />} />
        </Routes>
      </Router>
  )
}

export default App;
