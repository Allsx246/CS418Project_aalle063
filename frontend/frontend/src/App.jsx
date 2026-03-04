import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import Home from './Home.jsx';
import './App.css'

function App() {

  return (
     <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
  )
}

export default App;
