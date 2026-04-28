import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

export default function NameChange() {
    const [name, setName] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim() ) {
            setSubmitted(true);
            setName('');
            alert("Name: " + name);
            setTimeout(() => setSubmitted(false), 3000);
            axios.put('https://cs418project-aalle063.onrender.com/profile/update-name', { name, email:localStorage.getItem('email').toString() })
                .then(res => {
                    if (res.data.includes("successful")) {
                        alert("Name updated successfully!");
                        localStorage.setItem('name', name);
                         navigate('/profile');
                    } else {
                        alert("Failed to update name. Please try again." + res.data);
                    }
                })
                .catch(err => {
                    console.error('Error updating name:', err.response.data);
                    alert('Failed to update name. Please try again.');
                });
           
        }
    };

    return (
        <><Header />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign:'center' }}>
            <div style={{ padding: '15px', borderRadius: '10px', width: 'max-content', border: '1px solid #ccc', backgroundColor: 'rgb(132, 98, 98)' }}>
            <h2>Change Name</h2>
            <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }} onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter new name"
                    required
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
                <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>
                    Update Name
                </button>
            </form>
            {submitted && <p style={{ color: 'green', marginTop: '10px' }}>Name updated successfully!</p>}
       </div>
        </div></>
    );
}