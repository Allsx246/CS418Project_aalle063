/* eslint-disable no-unused-vars */
import './index.css'
import {Link} from 'react-router-dom'
import Validation from './SignupValidation'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
export default function Signup() {
    const [values, setValues] = useState({
    email: '',
    name: '',
    password: ''
   
  })

const navigate = useNavigate();
const [errors, setErrors] = useState({})
  const handleInput = (e) => {
    setValues(prev => ({...prev, [e.target.name]: [e.target.value]}))
  
  }

const handleSubmit = async (e) => {
  e.preventDefault();
  setErrors(Validation(values));
  const err = Validation(values);
  setErrors(err);
  if(err.name ==="" && err.email ==="" && err.password ===""){
    axios.post('https://project-cs418.web.app/signup', values)
    .then(res =>{
      if(res.data.includes('success')  ){
         navigate("/login-otp");
         let data = {
          isLoggedIn: true,
          name: values.name.toString(),

        }

        localStorage.setItem('name', data.name);
    }else

       alert("An account with that email already exists. Please try again with a different email.");
        return;

    })
    .catch(err => console.log(err));
  }
} 


return (
  
  <><Header />
  <div style={{ display: 'flex', justifyContent: 'space-evenly', 
    alignItems: 'center', textAlign:'center', height: '100vh',  position: 'fixed',
      top: '100px', left: '0', right: '0'}}>
    <div style={{ padding: '15px', borderRadius: '10px', width: 'max-content', 
      border: '1px solid #ccc', backgroundColor: '#f9f9f94b', 
      position: 'relative' }}>
      <h2>Sign Up</h2>
      <form action="" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" onChange={handleInput} placeholder='Enter Name' name='name' id="name"
            style={{ width: '100%', padding: '5px', borderRadius: '3px', border: '1px solid #ccc' }} />

          {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" onChange={handleInput} placeholder='Enter Email' name="email"
            style={{ width: '100%', padding: '5px', borderRadius: '3px', border: '1px solid #ccc' }} />
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" onChange={handleInput} placeholder='Enter Password' name="password" id="password"
            style={{ width: '100%', padding: '5px', borderRadius: '3px', border: '1px solid #ccc' }} />
          {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
        </div><p></p>
        <button className='login button'>Register</button>
        <p></p>
        <Link to="/" className='login button'>Already have an account? Login</Link>
      </form>
    </div>
  </div></> 

  )
}