import {Link} from 'react-router-dom'
import Validation from './LoginValidation.jsx'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';


export default function Login() {
 
const [values, setValues] = useState({
    email: '',
    password: ''
  })
const navigate = useNavigate();
const [errors, setErrors] = useState({})
  const handleInput = (e) => {
    setValues(prev => ({...prev, [e.target.name]: [e.target.value]}))
  
  }

const handleSubmit = (e) => {
  e.preventDefault();
  setErrors(Validation(values));
  const err = Validation(values);
  setErrors(err);
  if(err.email ==="" && err.password ===""){
    axios.post('http://localhost:8081/login', values)
    .then(res =>{
      if(res.data === "Success"){
        navigate("/dashboard");
        let data = {
          isLoggedIn: true,
          userType: "Logged in",
          email: values.email.toString(),
          password: values.password.toString()

        }
        localStorage.setItem('email', data.email);
        localStorage.setItem('userType', data.userType);
        localStorage.setItem('password', data.password);
        }
    else{
      

        alert("No account found with those credentials. Please try again or create an account.");
    }
    })
    .catch(err => console.log(err));
  }
} 


return (
 <><Header /><div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign:'center' }}>
    <div style={{ padding: '15px', borderRadius: '10px', width: 'max-content', border: '1px solid #ccc', backgroundColor: 'rgb(132, 98, 98)' }}>
      <h2 style={{ color: '#141539' }}>Sign-in</h2>
      <form action="" onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ color: '#141539' }}><strong>Email</strong></label>
          <input type="email" placeholder='Enter Email'
            name="email" onChange={handleInput}
            style={{ width: '100%', padding: '5px', borderRadius: '3px', border: '1px solid #ccc' }} />
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="password" style={{ color: '#141539' }}><strong>Password</strong></label>
          <input type="password"
            placeholder='Enter Password'
            name="password" onChange={handleInput}
            style={{ width: '100%', padding: '5px', borderRadius: '3px', border: '1px solid #ccc' }} />
          {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
        </div><p></p>
        <button type='submit' className='login button'>Login</button>
        <p></p>
        <Link to="/signup" className='signup button'>Create an Account</Link>
      </form>
    </div>
  </div></>
  )
}
