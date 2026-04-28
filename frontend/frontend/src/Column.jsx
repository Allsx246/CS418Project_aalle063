/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Header from './Header';

export default function Column() {
    const [items, setItems] = useState([
        { date: '', term: '', status: '' }
    ]);

    const setSavedItems = () => {
        let coursePlan = JSON.parse(localStorage.getItem('coursePlan'));
        let term = JSON.parse(localStorage.getItem('term'));  
        if ((coursePlan && term)) {
            let newItem = {
                date: term.lastTerm ? new Date(term.lastTerm).toLocaleDateString() : 'N/A',
                term: term.seasons || 'N/A',
                status: term.setting || 'N/A'
            };
            setItems(prevItems => [...prevItems, newItem]);
        }  
    };

    return (
        <><Header />
        
        <Container style={{display: 'flex', 
       flexDirection: 'column',
        justifyContent: 'center ',
         alignItems: 'center', padding: '10px',
            position: 'fixed',
                    top: '100px',
                    left: '0',
                    right: '0',
                    width: '100%',
                    
                    textAlign: 'center'
                }}>
            <h1>Course History</h1>
            <div classname='full-content' style={{width: 'fit-content', backgroundColor: '#f9f9f94b',}}
            >
            <div className="grid"

                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: '10px',
                    border: '1px solid #ccc',
                    
                    padding: '10px',
                    
                    margin: '0 auto',
                    height: 'auto',
                    alignContent: 'start',
                    gridColumnGap: '25px',
                    gridAutoRows: 'minmax(50px, auto)',
                    
                    
                }}>
                <h2>Date</h2>
                <h2>Term</h2>
                <h2>Status</h2>
            </div>
            <div className="grid-details"
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: '10px',
                    border: '1px solid  ',
                 
                    padding: '10px',
                    width: 'auto',
                    margin: '0 auto',
                    height: '100%',
                    alignContent: 'center',
                    backgroundColor: '#f9f9f92e',
                    gridAutoRows: 'minmax(50px, auto)',
                }}>
                {items.map((item) => (
                    <><div style={{ textAlign: 'center', border: '5px dotted #34438d', alignContent: 'center' }} key={item.date} className="grid-item">
                        {item.date}
                    </div>
                        <div style={{ textAlign: 'center', 
                            border: '5px dotted #34438d', alignContent: 'center' }} key={item.term} className="grid-item">
                            {item.term}
                        </div>
                        <div style={{ textAlign: 'justify', 
                            border: '5px dotted #34438d', alignContent: 'center' }} key={item.status} className="grid-item">
                            {item.status}
                        </div></>
                ))}
                </div>
                </div>
                <Link to="/courses"style={{ marginTop: '20px' }}>Back</Link>
        </Container></>
    );
}