/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Table from './CourseHistory';
import render from 'react-dom';
import Rows from './Rows';


export default function CourseForm() {

    
    const [courseInput, setCourseInput] = useState('');
    const [lastTerm, setLastTerm] = useState('');
    const [GPA, setGPA] = useState('');
    const [advising, setAdvising] = useState('');
    const [coursePlan, setCoursePlan] = useState({
        lastTerm,
        GPA,
        advising
    });

const getSeason = (date) => {
  const month = date.getMonth(); // 0 is January, 11 is December

    if (month >= 1 && month <= 5) return 'Spring';
    if (month >= 6 && month <= 8) return 'Summer';
    if (month >= 9 && month <= 11) return 'Autumn';
    return 'Winter'; // Covers Nov, Dec, Jan
};

    const [coursePlans, setCoursePlans] = useState([]);

    const addToCoursePlan = (courseArray) => {
        
        let coursePlans =  JSON.parse(localStorage.getItem('term'));
        

        coursePlans.seasons = getSeason(new Date(lastTerm)) + " " + new Date(lastTerm).getFullYear();
        coursePlans.GPA = GPA;
        coursePlans.year = new Date(lastTerm).getFullYear();
        coursePlans.lastTerm = new Date(lastTerm);
        coursePlans.advising = new Date(advising);
    

    // alert("Season: " + coursePlans.seasons + "\nYear: " + 
    // coursePlans.year + "\nIs Course List Filled: " + 
    // coursePlans.courseNumList.length + "\nIs Course Plan Full: " + 
    // coursePlans.rows.length + "\nAdvising Term: " + 
    // coursePlans.advising + "\nLast Term: " + coursePlans.lastTerm + 
    // "\nSetting: " + coursePlans.setting + "\nGPA: " + coursePlans.GPA);

    };



const navigate = useNavigate();

const handleSubmit = (e) => {
        e.preventDefault();

        addToCoursePlan();
        const requestData = {
            lastTerm: coursePlan.lastTerm,
            GPA: coursePlan.GPA,
            advising: coursePlan.advising,
            coursePlan: localStorage.getItem('term') ? JSON.parse(localStorage.getItem('term')).courseNumList : [],
            email: localStorage.getItem('email'),
            name: localStorage.getItem('name')
        };

        axios.post('https://cs418project-aalle063.onrender.com/course-advising', requestData)
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

    const removeFromCoursePlan = (index) => {
        setCoursePlan(coursePlan.filter((_, i) => i !== index));
    };



    return (   
              <><div style={{ position: 'fixed' }}>
            <Header />
        </div><div>

                <div className="course-form" style={{
                    padding: '20px', width: 'max-content', minHeight: 'fit-content', height: 'auto',
                    maxWidth: '1200px', margin: '0 auto', position: 'relative',
                    top: '100px', left: '0', right: '0'
                }}>

                    <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', gap: '20px' }}>
                        <h1 style={{ alignContent: 'center', textAlign: 'center' }}>Course Form</h1>

                        <div className="input-section">
                            <h1 style={{ alignContent: 'center', textAlign: 'center' }}>History</h1>
                            <div style={{
                                display: 'flex', flexDirection: 'row', gap: '20px',
                                alignContent: 'center', borderStyle: 'solid none', borderSpacing: "15px", padding: '15px'
                            }}>
                                Last Term
                                <input
                                    type="date"
                                    value={lastTerm}
                                    onChange={(e) => setLastTerm(e.target.value)}
                                    style={{ width: '100px', borderRadius: '5px', border: '1px solid #ccc' }}
                                    placeholder="Course term"
                                    onClick={(e) => e.key === 'Enter' && addToCoursePlan()} />
                                GPA
                                <input
                                    type="text"
                                    value={GPA}
                                    onChange={(e) => setGPA(e.target.value)}
                                    style={{ width: '100px', borderRadius: '5px', border: '1px solid #ccc' }}
                                    placeholder="Course GPA"
                                    onClick={(e) => e.key === 'Enter' && addToCoursePlan()} />

                                Current Advising Term
                                <input
                                    type="date"
                                    value={advising}
                                    onChange={(e) => setAdvising(e.target.value)}
                                    style={{ width: '100px', borderRadius: '5px', border: '1px solid #ccc' }}
                                    placeholder="Advising term" />

                            </div>
                        </div>

                        

                        <div className="section" style={{ alignContent: 'center', textAlign: 'center' }}>
                            <h2>Course Plan</h2>
                            <ul>
                                
                            </ul>

                            <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', height: 'auto', alignContent: 'center' }}>
                                
                                <Rows>

                                </Rows>
                            </div>
                            <Link to="/courses" style={{ marginTop: '20px' }}>View Course History</Link>
                        </div>
                        <div style={{ margin: '10px', padding: '10px', 
                            gap: '20px', textAlign: 'center', alignContent: 'center' }}>
                            <button onClick={addToCoursePlan} type='submit'>Submit Plan</button>
                        </div>
                    </form>
                </div>

            </div></>
    );
}

