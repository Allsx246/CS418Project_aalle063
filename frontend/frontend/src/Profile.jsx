/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/immutability */
import { useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';



export default function Profile() {
    const user = {
            username: 'demoUser',
            password: 'demoPass',
            email: 'demo@example.com'
        };

const navigate = useNavigate();
const [errors, setErrors] = useState({})
  const handleInput = (e) => {
    setValues(prev => ({...prev, [e.target.name]: [e.target.value]}))



  
  }

  
        

        return (

            <>
                <Header />
                <div style={{ display: 'flex', justifyContent: 'center', 
                  alignItems: 'center', height: 'auto', textAlign:'center', position: 'relative', top: '100px' }}>
    <div style={{ padding: '150px', borderRadius: '10px', width: 'max-content', 
      border: '1px solid #ccc', backgroundColor: 'rgba(132, 98, 98, 0.41)' }}>
      <h2 style={{ color: '#141539' }}>Profile</h2>
      <form action="" >
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ color: '#141539' }}><strong>Email</strong></label>
          <p> {localStorage.getItem('email')}</p>
        </div>
        <div>
          <label htmlFor="name" style={{ color: '#141539' }}><strong>Name</strong></label>
          <p> {localStorage.getItem('name')}</p>
          <button onClick={() => navigate("/name-change")} className='login button'>Change Name</button>
          <p></p>
  
        </div>
        <div>
          <label htmlFor="password" style={{ color: '#141539' }}><strong>Password</strong></label>
            <p>{localStorage.getItem('password')}</p>
        <p></p>
        <button onClick={() => navigate("/password-reset")} className='login button'>Reset Password</button>
        </div>
      </form>
    </div>
  </div>
            </>
        );
    
}