/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Header from './Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginOTP() {
const navigate = useNavigate();
let otpValue ='';

const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {

           axios.post('https://cs418project-aalle063.onrender.com/login/otp', { email })
            .then(res =>{
              if(res.data.includes("Success")){
             
                console.log('OTP verified:', otpValue);
                alert("OTP sent to your email. Please check your inbox.");
               // + "OTP: " + res.data.toString().split(" ")[1]
                setOtpSent(true);
       
               
                
              }
              else{
                alert("Failed to send OTP. Please try again.");
              }
                otpValue = res.data.toString().split(" ")[1];
                localStorage.setItem('otpValue', otpValue);
                
            })
            .catch(err => console.log(err));
        }    catch (err) {
            setError('Failed to send OTP. Please try again.');
        } finally {
            setLoading(false);
        }
 
    };

    const bool = (otp == localStorage.getItem('otpValue'))
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
          
            if (otp !== localStorage.getItem('otpValue')) {
                setError('Invalid OTP. Please try again.');

                
                setLoading(false);
                return;
            }
            axios.put('https://cs418project-aalle063.onrender.com/verify-otp', { email })
            .then(res =>{
              if(res.data.includes("successfully")){
                console.log('OTP verified:', otp);

                navigate("/");
              } else {
                setError('Invalid OTP. Please try again.');
             //  alert('OTP Value ' + localStorage.getItem('otpValue') + 'Are they equal2: ' + bool)
              }
            })
            .catch(err => console.log(err));
        } catch (err) {
            setError('Invalid OTP. Please try again.');
           // alert('OTP Value ' + localStorage.getItem('otpValue') + 'Are they equal3: ' + bool)
           
        } finally {
            setLoading(false);
        }
    };

    return (
       <><Header /><div style={{  display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', 
       textAlign:'center', position: 'fixed', top: '100px', left: '0', right: '0'  }}>
    <div style={{ padding: '15px', borderRadius: '10px', width: 'max-content', 
        border: '1px solid #ccc',  backgroundColor: 'rgb(132, 98, 98)' }}>
        <h2>Verify Email</h2>
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

            {!otpSent ? (
                <form onSubmit={handleSendOtp}><div>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: 'max-content', padding: '10px', marginBottom: '10px'}} /></div>
                    <button type="submit" disabled={loading} style={{ width: 'max-content', padding: '10px', cursor: 'pointer' }}>
                        {loading ? 'Sending...' : 'Send OTP'}
                    </button>
                </form>
            ) : (
                <form onSubmit={handleVerifyOtp}>
                    <p>OTP sent to {email}</p>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        style={{ width: 'max-content', padding: '10px', marginBottom: '10px' }} />
                    <button type="submit" disabled={loading} style={{ width: 'max-content', padding: '10px', cursor: 'pointer' }}>
                        {loading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                </form>
            )}
    </div></div></>
    
    );
    
};

