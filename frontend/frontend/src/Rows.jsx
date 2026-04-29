/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Select from "react-select";
import courses from './class.json';



export default function Rows(){
    
const [nextId, setNextId] = useState(2);
const [level, setLevel] = useState(
        ""
);
        const [course, setCourse] = useState(
        ""
);
const [courseNumber, setCourseNumber] = useState(
    0
);

const [courseList, setCourseList] = useState([]);
const [rows, setRows] = useState([{ id: 1, level, course, courseNumber}]);


const [term, setHistory] = useState({
    season: '',
    year: '',
    courseNumList: [],
    setting: '',
    rows: [{ id: 1, level, course, courseNumber }],
    lastTerm: '',
    GPA: '',
    advising: ''
});


//Custom styles for the react-select component to ensure the text is 
// visible and the dropdown is styled appropriately.
const customStyles = {
  option: provided => ({
    ...provided,
    color: 'black'
  }),
  control: provided => ({
    ...provided,
    color: 'black'
  }),
  singleValue: provided => ({
    ...provided,
    color: 'black'
  })
}

const getSeason = (date) => {
  const month = date.getMonth(); // 0 is January, 11 is December
  
  if (month >= 2 && month <= 4) return 'Spring';
  if (month >= 5 && month <= 7) return 'Summer';
  if (month >= 8 && month <= 10) return 'Autumn';
  return 'Winter'; // Covers Nov, Dec, Jan
};




    const addRow = () => {
        if(rows.length >= 5){
            alert("Maximum of 5 courses can be added to the course plan.");
            return;
        }
        setRows([...rows, { id: nextId}]);
        setNextId(nextId + 1);
        
    };


   
    const deleteRow = (id) => {
        setRows(rows.filter(row => row.id !== id));
    };

    const updateRow = (id, field, value, value2) => {
        value2 = value2 || 0;
        if(field.includes("level")){
            setLevel({level: value});
            setRows(prevRows => prevRows.map(row => 
                row.id === id ? { ...row, level: value } : row ));
                
            let courseList = courses.find(c => c.level === value).courses;
            setCourseList(courseList);
            
        }else if(field.includes("course")){
        
            if(courseList.includes(value2) || checkDuplicateCourses(value2) === true && rows.find(c => c.id !== id)){
                alert("Course already added to the course plan. Please Pick another course.");
                return;
            }
                setCourse({course: value});
                setRows(prevRows => prevRows.map(row => 
                row.id === id ? { ...row, course: value, courseNumber: value2 } : row ));
                rows.forEach(row => {
                    if(row.id === id && !term.courseNumList.includes(value2)){
                        term.courseNumList.push(value2);
                    }
                });
    }

};

    

    const checkDuplicateCourses = (courseNum) => {
        return rows.some(row => row.courseNumber === courseNum);
    }


    const print = () =>{
        rows.forEach(row => {
            if(row.level === "" || row.course === "" || row.courseNumber === 0){
                alert("Please fill out all fields for each course before printing.");
                return;
            }
        term.courseNumList.forEach(courseNum => {
            if(courseNum === row.courseNumber){
                console.log("Course added to term: " + row.level + " " + row.course + " " + courseNum);
            }
            console.log("Course added to term: " + row.level + " " + row.course + " " + courseNum);
        });
            alert("Level: " + row.level + " courses: " + row.course +' Course Number: ' + row.courseNumber + ' Rows: ' + row.id)
            
            }
        );
        console.log("Course Num Size: " + term.courseNumList.length);
    
    }


    const clearCoursePlan = () => {
        setRows([{ id: 1, level: '', course: '', courseNumber: 0 }]);
        setHistory({});
        localStorage.removeItem('coursePlan');
        localStorage.removeItem('term');
        alert("Course plan cleared!");
    }


const saveCoursePlan = () => {
    // This function would handle saving the course plan, e.g., sending it to a backend server.
    // For now, it just logs the course plan to the console.

    
    rows.forEach(row => {
        if(row.level && row.course && row.courseNumber !== 0) {
            term.rows = rows;
           // alert("Course added to term: " + row.level + " " + row.course + " " + row.courseNumber);
        }else if(row.level === "" || row.course === "" || row.courseNumber === 0){
            alert("Please fill out all fields for each course before saving.");
            return;
        }else if(term.rows.some(r => r.courseNumber === row.courseNumber)){
            alert("Duplicate course numbers found. Please ensure all courses in the plan are unique.");
            return;
        }   
        return;
    });
    JSON.stringify(term.courseNumList);
    term.setting = "Pending";
    localStorage.setItem('coursePlan', JSON.stringify(rows));
    localStorage.setItem('term', JSON.stringify(term));
    localStorage.setItem("courses", JSON.stringify(term.courseNumList));
    console.log("Course Num Size: " + term.courseNumList.length);
    alert("Course plan saved!");
}





    return (
        <div>

            <table className="rows-table" style={{borderStyle: 'solid none', borderSpacing: "15px", padding: '15px'}}>
                
                <tbody  style={{ gap: '20px', 
                    alignContent: 'center', alignItems:'center'}}>
                    {rows.map(row => (
                        <tr key={row.id} style={{  
                    alignContent: 'center', alignItems:'center'}}>
                                <td>Level</td>
                            <td>
                                <Select
                                    value={row.level}
                                    options={' - ', courses} getOptionLabel={x => x.level}
                                    getOptionValue={x => x.level}
                                    onChange={(e) => updateRow(row.id, "level", e.level)}
                                    placeholder= {row.level ? row.level : "Select Level"}
                                    styles={customStyles} isSearchable={false}
                                    style={{  
                    alignContent: 'center', alignItems:'center', width: '100%', color: 'black'}}> 
                                

                    </Select>
                            </td>
                            <th>Course</th>
                            <td>
                                <Select
                                    style={{ 
                    alignContent: 'center', alignItems:'center', width: '100%', color: 'black'}}
                                    value={row.course}
                                    onChange={(e) => updateRow(row.id, "course", e.name, e.id)}
                                    placeholder= {row.course ? row.course : "Select Course"}
                                    options={ ' - ' , courseList} getOptionLabel={x => x.name}
                                    getOptionValue={x => x.name, x => x.id} isSearchable={false}
                                    styles={customStyles}
                                />

                            

                            </td>
                            <td>
                                <button onClick={() => deleteRow(row.id)} className="delete-btn"
                                    style={{ width: 'auto', backgroundColor: 'red', borderRadius: '50%', aspectRatio: '1/1', alignContent: 'center', textAlign: 'center'}}>
                                -
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button type="button" onClick={print} style={{ marginRight: '20px', backgroundColor: 'green', borderRadius:'50%', aspectRatio: '1/1', alignContent: 'center'}}>
                    Print
            </button>
            <button type="button" onClick={addRow} className="add-btn" style={{ marginLeft: '20px', backgroundColor: 'green', borderRadius:'50%', aspectRatio: '1/1', alignContent: 'center'}}>
                +
            </button>
            <div>
                            <Select type='select' style={{ width: '100px', borderRadius: '5px', border: '1px solid #ccc' }} placeholder='Status: Pending ' isDisabled={localStorage.getItem('userRole') === 'Student' ? true : false} value={term.setting} isSearchable={false} onChange={(e) => setHistory({...term, setting: e.target.value})}>
                            <option value='Pending'>Pending</option>
                            <option value='Approved'>Approved</option>
                            <option value='Denied'>Denied</option>
                            </Select>
                </div>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button type = "button" onClick={saveCoursePlan} style={{ padding: '10px 20px', 
                    backgroundColor: '#7A779E', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Save Course Plan
                </button>
                <button type = "button" onClick={clearCoursePlan} style={{ padding: '10px 20px', marginLeft: '20px', backgroundColor: '#7A779E', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Clear Course Plan
                </button>
            </div>

        </div>


    );
}