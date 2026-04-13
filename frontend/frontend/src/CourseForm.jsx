/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Table from './CourseHistory';



export default function CourseForm() {
    const [history, setHistory] = useState([]);
    const [coursePlan, setCoursePlan] = useState([]);
    const [courseInput, setCourseInput] = useState('');
    const [lastTerm, setLastTerm] = useState('');
    const [GPA, setGPA] = useState('');
    const [advising, setAdvising] = useState('');

    const addToHistory = () => {
        if (courseInput.trim()) {
            setHistory([...history, courseInput]);
            setCourseInput('');
        }
    };

    const addToCoursePlan = () => {
        if (courseInput.trim()) {
            setCoursePlan([...coursePlan, courseInput]);
            setCourseInput('');
        }
    };

    

 const navigate = useNavigate();

 const handleSubmit = (e) => {
        e.preventDefault();
        const requestData = {
            history,
            coursePlan,
            email: localStorage.getItem('email')
        };
        axios.post('http://localhost:8081/course-advising', requestData)
            .then(res => {
                if (res.data.includes("successful")) {  
                    alert("Course advising request submitted successfully!");
                    navigate('/course-history');
                } else {
                    alert("Failed to submit course advising request. Please try again." + res.data);
                }
            })
            .catch(err => {
                console.error('Error submitting course advising request:', err.response.data);
                alert('Failed to submit course advising request. Please try again.');
            });
    };

const handleInputChange = (e) => {
        setCourseInput(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addToCoursePlan();
        }
    };

   



    const removeFromHistory = (index) => {
        setHistory(history.filter((_, i) => i !== index));
    };

    const removeFromCoursePlan = (index) => {
        setCoursePlan(coursePlan.filter((_, i) => i !== index));
    };

    return (
        <>
        <Header />

        
        <div className="course-form" style={{ padding: '20px', width: 'max-content', 
            maxWidth: '1200px', margin: '0 auto', height: '100vh', position: 'fixed',
      top: '100px', left: '0', right: '0' }}>
            
            

            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <h1>Course Management</h1>

        <div className="input-section">
                <h2>History</h2>
                <input
                    type="text"
                    value={lastTerm}
                    onChange={(e) => setLastTerm(e.target.value)}
                    style={{ width: '300px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    placeholder="Enter course code or name"
                    onClick={(e) => e.key === 'Enter' && addToCoursePlan()} /><p></p>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <input
                    type="text"
                    value={GPA}
                    onChange={(e) => setGPA(e.target.value)}
                    style={{ width: '300px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    placeholder="Enter course code or name"
                    onClick={(e) => e.key === 'Enter' && addToCoursePlan()} /><p></p>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>

                <input
                    type="text"
                    value={advising}
                    onChange={(e) => setAdvising(e.target.value)}
                   
                    style={{ width: '300px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    placeholder="Enter course code or name" />
                <p></p>
                    </div>
                <button onClick={addToHistory}>Add to History</button> 
                <button onClick={addToCoursePlan}>Add to Plan</button><p></p>
                </div>
        </div>

            <div className="sections-container">
                <div className="section">
                    <h2>Course History</h2>
                    <ul>
                        {history.map((course, index) => (
                            <li key={index}>
                                {course}
                                <button onClick={() => removeFromHistory(index)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="section">
                    <h2>Course Plan</h2>
                    <ul>
                        {coursePlan.map((course, index) => (
                            <li key={index}>
                                {course}
                                <button onClick={() => removeFromCoursePlan(index)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <Link to="/courses" style={{ marginTop: '20px' }}>View Course History</Link>
            </div></form>
        </div>

        </>
    );
}