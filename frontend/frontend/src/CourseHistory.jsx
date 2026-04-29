/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import axios from 'axios';




export default function CourseHistory() {   

 const [semesters, setSemesters] = useState({
    date: '',
    term:'',
    status: ''
 });

 const getSeason = (date) => {
  const month = date.getMonth(); // 0 is January, 11 is December

    if (month >= 1 && month <= 5) return 'Spring';
    if (month >= 6 && month <= 8) return 'Summer';
    if (month >= 9 && month <= 11) return 'Autumn';
    return 'Winter'; // Covers Nov, Dec, Jan
};

  const getSemesters = (data) => {
   
    // const currentDate = new Date();
    // const currentYear = currentDate.getFullYear();
    // const currentMonth = currentDate.getMonth();
    // const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];

    if(data && data.length > 0){
        data.map(entry => {
            const termDate = getSeason(new Date(entry.term)) + " " + new Date(entry.term).getFullYear();
            const termStatus = entry.status;
            const date = new Date(entry.term);
            setSemesters(prev => ({ ...prev, term: termDate, status: termStatus, date: date }));
        });
    }


    // for (let year = currentYear; year >= currentYear - 4; year--) {
    //   for (let season of seasons) {
    //     if (year === currentYear) {
    //       if ((season === 'Spring' && currentMonth >= 1) ||
    //           (season === 'Summer' && currentMonth >= 5) ||
    //           (season === 'Autumn' && currentMonth >= 8) ||
    //           (season === 'Winter' && currentMonth >= 11)) {
    //         semesters.push(`${season} ${year}`);
    //       }
    //     } else {
    //       semesters.push(`${season} ${year}`);
    //     }
    //   }
    // }
    return semesters;
  };

  useEffect(() => {
    const semesters = getSemesters();
    console.log("Semesters: ", semesters);
    axios.get('https://cs418project-aalle063.onrender.com/course-history', {
      params: { email: localStorage.getItem('email') }
    })
    .then(res => {
      if(res.data.length === 0){
        console.log("No course history found for this user.");
        alert("No course history found for this user.");
        return;
      }
      console.log("Course history response: ", res.data);

      
    })
    .catch(err => console.log("Error fetching course history: ", err));

  }, []);


    return (
        <><Header /><div style={{ padding: '20px', width: 'max-content', 
        maxWidth: '1200px', margin: '0 auto', height: '100vh', position: 'fixed',
      top: '100px', left: '0', right: '0' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Course Advising History</h2>
        <Link to="/course-form" style={{ display: 'block', textAlign: 'center', marginBottom: '20px', color: '#141539', textDecoration: 'none' }}>
        Submit New Course Advising Request</Link> 
      <p></p>
      {semesters.term ? (
        <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f94b' }}>
          <h3 style={{ textAlign: 'center' }}>Semester:{semesters.term}</h3> 
          <p style={{ textAlign: 'center', color: '#666' }}>Status: {semesters.status}</p>
        </div>
      ) : ( 
        <p style={{ textAlign: 'center', color: '#666' }}>No course advising history found.</p>
      )}
      <p></p> 
      {semesters.date ? (
        <p style={{ textAlign: 'center', color: '#666' }}>Advising Date: {semesters.date.toLocaleDateString()}</p>
      ): ( 
        <p style={{ textAlign: 'center', color: '#666' }}>No course advising history found.</p>
      )}
      {semesters.status ? (
        <p style={{ textAlign: 'center', color: '#666' }}>Status: {semesters.status}</p>
      ) : ( 
        <p style={{ textAlign: 'center', color: '#666' }}>No course advising history found.</p>
      )}
      <p></p>
        {/* <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}></div>
          <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f94b' }}>
            <h3 style={{ textAlign: 'center' }}>Course 1</h3>
            <p style={{ textAlign: 'center', color: '#666' }}>Semester: Spring 2024</p>
            <p style={{ textAlign: 'center', color: '#666' }}>GPA: 3.5</p>
            <p style={{ textAlign: 'center', color: '#666' }}>Advising Term: Spring 2024</p>
            <p style={{ textAlign: 'center', color: '#666' }}>Status: Submitted</p>
          </div>
          <p></p>
          <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f94b' }}>    
            <h3 style={{ textAlign: 'center' }}>Course 2</h3>
            <p style={{ textAlign: 'center', color: '#666' }}>Semester: Fall 2023</p>
            <p style={{ textAlign: 'center', color: '#666' }}>GPA: 3.8</p>
            <p style={{ textAlign: 'center', color: '#666' }}>Advising Term: Fall 2023</p>
          </div>
          <p></p>
            <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f94b' }}>
            <h3 style={{ textAlign: 'center' }}>Course 3</h3>
            <p style={{ textAlign: 'center', color: '#666' }}>Semester: Summer 2023</p>
            <p style={{ textAlign: 'center', color: '#666' }}>GPA: 3.2</p>
            <p style={{ textAlign: 'center', color: '#666' }}>Advising Term: Summer 2023</p>
          </div>
          <p></p>
          <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f94b' }}>
           <h3 style={{ textAlign: 'center' }}>Course 1</h3>
            <p style={{ textAlign: 'center', color: '#666' }}>Semester: Spring 2024</p>
            <p style={{ textAlign: 'center', color: '#666' }}>GPA: 3.5</p>
            <p style={{ textAlign: 'center', color: '#666' }}>Advising Term: Spring 2024</p>
          </div>   */}
          <Link to='/column' style={{ display: 'block', textAlign: 'center', marginTop: '20px', color: '#141539', textDecoration: 'none' }}>View Course History in Grid Format</Link> 
          <p></p>
          <Link to="/dashboard" style={{ display: 'block', textAlign: 'center', marginTop: '20px', color: '#141539', textDecoration: 'none' }}>Back to Dashboard</Link> 
      </div></>
      
    );
}
