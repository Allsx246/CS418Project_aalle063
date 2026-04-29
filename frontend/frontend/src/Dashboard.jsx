import Header from './Header'
import CourseHistory from './CourseHistory'
import {Link} from 'react-router-dom'
import ClickJack from './ClickJack'
import Admin from './Admin'

function Admin_Dashboard() {


  return (

    
      <><Header /><div style={{ padding: '20px', width: 'max-content', maxWidth: '1200px', 
        height: '100vh', margin: '0 auto',   position: 'relative', top: '100px'  }}>
      <div style={{ display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', 
        marginTop: '20px', position: 'relative' }}>
        <div style={{ padding: '15px', alignContent: 'center', 
          border: '1px solid #ddd', borderRadius: '8px', 
          backgroundColor: '#f9f9f94b', height: '100px' , display: 'flex', 
          flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>
         <Link src='./Admin.jsx'>  <h3 style={{ textAlign: 'center' }}>Total Students</h3>   </Link>
          <p style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', color: '#141539' }}>1</p>
       
        </div>
        <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f94b' }}>
          <h3 style={{ textAlign: 'center' }}>Active Users</h3>
          <p style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', color: '#141539' }}>0</p>
        </div>
        <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f94b' }}>
          <h3 style={{ textAlign: 'center' }}>Total Courses</h3>
          <p style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', color: '#141539' }}>0</p>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '30px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f94b' }}>
        <h3>Recent Activity</h3>
        <p style={{ color: '#666' }}>No recent activity</p>
      </div>
//ClickJack component is added here to demonstrate the clickjacking 
//vulnerability. In a real application, this would not be included 
//in the dashboard and would be used for testing purposes only.
      <ClickJack />
    </div></>
    
  )
}

function User_Dashboard() {
  return (
   
      <><Header /><div style={{ padding: '20px', width: 'max-content', 
      maxWidth: '1200px', margin: '0 auto', height: '100vh',  position: 'relative', top: '100px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
        <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f94b' }}>
          <h3 style={{ textAlign: 'center' }}>Enrolled Courses</h3>
          <p style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', color: '#141539' }}>0</p>
          <p><Link to="/courses" style={{ display: 'block', textAlign: 'center', marginTop: '10px', color: '#141539', textDecoration: 'none' }}>View Course History</Link></p>
        </div>
        
        <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f94b' }}>
          <h3 style={{ textAlign: 'center' }}>Assignments Due</h3>
          <p style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', color: '#141539' }}>0</p>
        </div>
        <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f94b' }}>
          <h3 style={{ textAlign: 'center' }}>GPA</h3>
          <p style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', color: '#141539' }}>0.00</p>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '30px', padding: '15px', 
        border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f94b', height: '100px' }}>
          <h3>Upcoming Deadlines</h3>
      <p style={{ color: '#666' }}>No upcoming deadlines</p>
        </div>
//ClickJack component is added here to demonstrate the clickjacking 
//vulnerability. In a real application, this would not be included 
//in the dashboard and would be used for testing purposes only.
        <ClickJack />
        
    </div></>
    
    
  )
}

function Dashboard() {
  const user = localStorage.getItem('user');
  return (  
    <div>
      {user === 'Student' ? <User_Dashboard /> : <Admin_Dashboard />}
    </div>
  );
}
export default Dashboard;
