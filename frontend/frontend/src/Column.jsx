/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from './Header';

export default function Column() {
    const items = [
        { date: '2/15/2024', term: 'Fall 2024', status: 'Description for item 1' },
        { date: '10/15/2023', term: 'Summer 2023', status: 'Description for item 2' },
        { date: '2/17/2024', term: 'Fall 2024', status: 'Description for item 3' },
        { date: '9/3/2022', term: 'Fall 2022', status: 'Description for item 4' },
        { date: '5/20/2023', term: 'Fall 2024', status: 'Description for item 5' },
        { date: '12/20/2024', term: 'Fall 2024', status: 'Description for item 6' },
    ];

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
        </Container></>
    );
}