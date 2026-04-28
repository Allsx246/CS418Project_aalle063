import React, { useState } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Validation from './LoginValidation';



export default function PasswordReset() {
 
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

        // TODO: Send password reset request to backend
        if (err.email === "" && err.password === "") {
             axios.post('https://cs418project-aalle063.onrender.com/password-reset', { email: values.email, password: values.password }) 
            .then(res =>{
                if(res.data.includes("successful")){
                    alert("Password reset successful. Please log in with your new password.");
                    localStorage.setItem('userType', 'Logged Out')
                    navigate('/');
                }
                else{
                    alert("Failed to reset password. Please try again.");
                }
            })
            .catch(err => {
                console.error('Error resetting password:', err);

                alert('Failed to reset password. Please try again.' );
        
            });
        }
    


        console.log('Password reset requested for:', values.email);
    };

    

    return (
        <><Header />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign:'center' }}>
    <div style={{ padding: '15px', borderRadius: '10px', width: 'max-content', 
        border: '1px solid #ccc', backgroundColor: 'rgb(132, 98, 98)', 
        position: 'relative' }}>
                <h1>Reset Password</h1>

                
                    <form action="" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                        <div><label htmlFor="email"><p>Email Address</p></label>
                        <input
                            name="email"
                            type="email"
                            onChange={handleInput}
                            placeholder="Enter your email" 
                            style={{ width: '50%', padding: '5px', borderRadius: '3px', border: '1px solid #ccc' }}/>
                            {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                       </div>
                       <div>
                         <label ><p>New Password</p></label>
                        <input
                            name="password"
                            type="password"
                            onChange={handleInput}
                            placeholder="Enter your new password" 
                            style={{ width: '50%', padding: '5px', borderRadius: '3px', border: '1px solid #ccc' }}/>
                            {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
        </div>
                        <button
                        style={{ width: '200px', padding: '5px', borderRadius: '3px', border: '1px solid #ccc' }} 
                        onClick={handleSubmit}
                        type="submit">Reset Password</button>
                    </form>
                
            </div>
        </div></>
    );
}