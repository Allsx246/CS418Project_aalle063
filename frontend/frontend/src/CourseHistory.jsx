import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';



export default function CourseHistory() {   


    return (
        <><Header /><div style={{ padding: '20px', width: 'max-content', 
        maxWidth: '1200px', margin: '0 auto', height: '100vh', position: 'fixed',
      top: '100px', left: '0', right: '0' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Course Advising History</h2>
        <Link to="/course-form" style={{ display: 'block', textAlign: 'center', marginBottom: '20px', color: '#141539', textDecoration: 'none' }}>
        Submit New Course Advising Request</Link> 
      <p></p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}></div>
          <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f94b' }}>
            <h3 style={{ textAlign: 'center' }}>Course 1</h3>
            <p style={{ textAlign: 'center', color: '#666' }}>Semester: Spring 2024</p>
            <p style={{ textAlign: 'center', color: '#666' }}>GPA: 3.5</p>
            <p style={{ textAlign: 'center', color: '#666' }}>Advising Term: Spring 2024</p>
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
          </div>  
          <Link to='/column' style={{ display: 'block', textAlign: 'center', marginTop: '20px', color: '#141539', textDecoration: 'none' }}>View Course History in Grid Format</Link> 
          <p></p>
          <Link to="/dashboard" style={{ display: 'block', textAlign: 'center', marginTop: '20px', color: '#141539', textDecoration: 'none' }}>Back to Dashboard</Link> 
      </div></>
      
    );
}
