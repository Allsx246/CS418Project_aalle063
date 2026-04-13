/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';


export default function StudentMenu() {
    const [advisingHistory, setAdvisingHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // TODO: Replace with actual API call
        const mockData = [
            { date: '2024-01-15', term: 'Spring 2024', status: 'Completed' },
            { date: '2023-10-20', term: 'Fall 2023', status: 'Completed' },
            { date: '2023-07-10', term: 'Summer 2023', status: 'Completed' },
            { date: '2023-04-05', term: 'Spring 2023', status: 'Pending' },
        ];
        setAdvisingHistory(mockData);
        setLoading(false);
    }, []);

    if (loading) return <div className="container">Loading...</div>;

    return (
        <div className="container">
            <h1>Course Advising History</h1>
            <table className="advising-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Term</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {advisingHistory.map((record, index) => (
                        <tr key={index}>
                            <td>{record.date}</td>
                            <td>{record.term}</td>
                            <td className={`status ${record.status.toLowerCase()}`}>
                                {record.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}