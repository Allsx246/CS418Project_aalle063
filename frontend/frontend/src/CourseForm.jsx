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

    const[courseList, setCourseList] = useState([]);
    const [ready, setReady] = useState(false);
const getSeason = (date) => {
  const month = date.getMonth(); // 0 is January, 11 is December

    if (month >= 1 && month <= 5) return 'Spring';
    if (month >= 6 && month <= 8) return 'Summer';
    if (month >= 9 && month <= 11) return 'Autumn';
    return 'Winter'; // Covers Nov, Dec, Jan
};

    const [coursePlans, setCoursePlans] = useState([]);

    const addToCoursePlan = (courseArray) => {
        
        let coursePlans =  JSON.parse(localStorage.getItem('term')) ? JSON.parse(localStorage.getItem('term')) : {  };
        setCourseList(JSON.parse(localStorage.getItem('courses'))) ? JSON.parse(localStorage.getItem('courses')) : coursePlan;
        console.log("Tyope of course plans: " + typeof coursePlans);
        console.log("Course Plans: " + coursePlans);
        console.log("Course Plan Course List: " + courseList.length);
        console.log("Type of Course List: " + typeof localStorage.getItem('term').courseNumList);
        console.log("Course List Size: " + coursePlans.courseNumList.length);
        coursePlans.courseNumList.forEach(value => {
            if(!coursePlans.courseNumList.includes(value)){
                coursePlans.courseNumList.push(value);
                console.log(value);
            }

        });
        coursePlans.courseNumList = localStorage.getItem('courses') ? JSON.parse(localStorage.getItem('courses')) : coursePlan;
        console.log("Course Array: " + coursePlans.courseNumList + "\nCourse Plan Course List: " + coursePlans.courseNumList.length);
        coursePlans.seasons = getSeason(new Date(lastTerm)) + " " + new Date(lastTerm).getFullYear();
        coursePlans.GPA = GPA;
        coursePlans.year = new Date(lastTerm).getFullYear();
        coursePlans.lastTerm = new Date(lastTerm);
        coursePlans.advising = new Date(advising);
        console.log("Season: " + coursePlans.seasons + "\nYear: " + 
        coursePlans.year + "\nIs Course List Filled: " + 
        coursePlans.courseNumList.length + "\nIs Course Plan Full: " + 
        coursePlans.rows.length + "\nAdvising Term: " + 
        coursePlans.advising + "\nLast Term: " + coursePlans.lastTerm + 
        "\nSetting: " + coursePlans.setting + "\nGPA: " + coursePlans.GPA);

    };



const navigate = useNavigate();

const handleSubmit = (e) => {
        e.preventDefault();
        if(coursePlan.length === 0 || lastTerm === '' || GPA === '' || advising === ''){
            alert("Please fill out all fields before submitting the course advising request.");
            return;
        } else if (coursePlans.length === 0 || coursePlans.courseNumList.length === 0 || coursePlans.lastTerm === '' || coursePlans.GPA === '' || coursePlans.advising === ''){
            console.log("Course Plans: " + coursePlans);
            addToCoursePlan();
        }

        
        const requestData = {
            lastTerm: new Date(lastTerm),
            GPA: GPA,
            advising: new Date(advising),
            level: JSON.parse(localStorage.getItem('courses')) ? JSON.parse(localStorage.getItem('courses')) : coursePlan,
            email: localStorage.getItem('email'),
            name: localStorage.getItem('name')
        };
       // console.log("Course Plan: " + typeof requestData.coursePlan + "\nCourse Plan Length: " + requestData.coursePlan.length);
       // requestData.coursePlan.map(course => console.log("Courses in request data: " + course));
       // console.log("Last Term: " + requestData.lastTerm + "\nGPA: " + requestData.GPA + "\nAdvising Term: " + requestData.advising + "\nCourse Plan: " + requestData.coursePlan + "\nEmail: " + requestData.email + "\nName: " + requestData.name  );

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
                console.error('Error submitting course advising request: ',  err.toString());
                alert('Failed to submit course advising request. Please try again. ' + err.toString());
            });
    };

    
const handleInputChange = (e) => {
        setCourseInput(e.target.value);
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

                    <form onSubmit={(e) => handleSubmit(e)} action="" style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', gap: '20px' }}>
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
                    
                            <button type="submit" style={{ margin: '10px', padding: '10px', 
                            width: '100px', borderRadius: '5px', backgroundColor: '#646cff', color: 'white',
                            gap: '20px'}} onClick={(e) => {
                                            e.preventDefault()
                                            setReady(true)
                                            handleSubmit(e)
                                            }}>Submit</button>
                      
                    </form>
                     
                </div>

            </div></>
    );
}

