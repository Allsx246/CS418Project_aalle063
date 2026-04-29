/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CourseForm from './CourseForm';




export default function CourseHistory() {   

 const [semesters, setSemesters] = useState([{
    date: '',
    term:'',
    status: '',
    courseHistory: [],
    gpa: '',
    time: ''
 }]);

 const getSeason = (date) => {
  const month = date.getMonth(); // 0 is January, 11 is December

    if (month >= 1 && month <= 5) return 'Spring';
    if (month >= 6 && month <= 8) return 'Summer';
    if (month >= 9 && month <= 11) return 'Autumn';
    return 'Winter'; // Covers Nov, Dec, Jan
};

  const [courseHistory, setCourseHistory] = useState([]);

  const [ready, setReady] = useState(false);
  const history = (value) => {
    if(value.includes(true)){
      localStorage.setItem('review', 'true');
    } else {
      localStorage.setItem('review', 'false');
    }

  }


  const getSemesters = (data) => {

    if(data && data.length > 0){

        data.map(entry => {
          console.log("Entry: ", entry);
          setCourseHistory(prev => [...prev, entry.level ? entry.level : "N/A"]);
            const season = getSeason(new Date(entry.term));
            const year = new Date(entry.term).getFullYear();
            const term = season + " " + year;
            semesters.push({
                date: new Date(entry.advising),
                term: term,
                status: entry.status,
                courseHistory: courseHistory,
                gpa: entry.GPA,
                time: new Date(entry.term)
            });
          
            
        });
        semesters.shift(); // Remove the initial empty semester
        semesters.map
        localStorage.setItem('semester', JSON.stringify({
              semesters// Remove the initial empty semester
            }));
    }

    return semesters;
  };

  useEffect(() => {
   
    const semesters = getSemesters();
    console.log("Semesters: ", semesters + "email: " + localStorage.getItem('email'));
    axios.post('https://cs418project-aalle063.onrender.com/course-history', {email: localStorage.getItem('email')})
    .then(res => {
      if(res.data.length === 0){
        console.log("No course history found for this user.");
        alert("No course history found for this user.");
        return;
      }
      getSemesters(res.data)
      console.log("Course history response: ", res.data);
      console.log("Semesters after processing course history: ", semesters);

      
    })
    .catch(err => console.log("Error fetching course history: ", err + "email: " + localStorage.getItem('email')));

}, []);


    return (
      <><Header /><div style={{
        padding: '20px', width: 'max-content',
        maxWidth: '1200px', margin: '0 auto', height: '100vh', position: 'fixed',
        top: '100px', left: '0', right: '0'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Course Advising History</h2>
        <Link to="/course-form" style={{ display: 'block', textAlign: 'center', marginBottom: '20px', color: '#141539', textDecoration: 'none' }}>
          Submit New Course Advising Request</Link>
        <p style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}></p>
        <div >
         {semesters.map((semester, index) => (

            <div key={index} style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f94b',marginBottom: '20px' }} >
             <Link src='/course-form'><h3 style={{ textAlign: 'center' }}>Advising Term: {semester.term}</h3></Link>
             <p style={{ textAlign: 'center', color: '#666' }}>Advising Date: {semester.date ? semester.date.toLocaleDateString() : 'N/A'}</p>
             <p style={{ textAlign: 'center', color: '#666' }}>GPA: {semester.gpa || 'N/A'}</p>
             <p style={{ textAlign: 'center', color: '#666' }}>Status: {semester.status || 'N/A'}</p>
             </div>
         ))}
        </div>
        <p></p>
         
        <Link to='/column' style={{ display: 'block', textAlign: 'center', marginTop: '20px', color: '#141539', textDecoration: 'none' }}>View Course History in Grid Format</Link>
        <p></p>
        <Link to="/dashboard" style={{ display: 'block', textAlign: 'center', marginTop: '20px', color: '#141539', textDecoration: 'none' }}>Back to Dashboard</Link>
      </div></>
      
    );
}
