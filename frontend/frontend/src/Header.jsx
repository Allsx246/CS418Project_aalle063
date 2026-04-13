import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavbarBrand from 'react-bootstrap/esm/NavbarBrand';

function LoggedOutHeader() {
    return (
        <form className="LoggedOutHeader">
        <Navbar >
        <Container expand="lg" data-bs-theme="dark" style={{margins:"0", padding:"20px",
             backgroundColor:"#333", width:"100%" , overflow:"hidden",
            display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', 
            position: 'fixed', top: '0', left: '0', right: '0'
            }}>
            <>
            <NavbarBrand style={{color:"#fff", fontSize:"24px", textAlign:"start", 
                fontWeight:"bold"}} href="#home"> My App</NavbarBrand>
         </>
            <Nav.Link href="/"> Login</Nav.Link>
            <Nav.Link href="/signup"> Sign Up</Nav.Link>
        </Container>
      </Navbar>
    </form>

    )
}


function LoggedInHeader() {

    let data = {
  isLoggedIn: false,
  userType: "Logged out"
}

    return (
        <form className="admin_header">
        <Navbar >
        <Container expand="lg" data-bs-theme="dark" style={{margins:"0", padding:"20px",
            textAlign:"right", backgroundColor:"#333", width:"100%", overflow:"hidden",
            display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', 
            position: 'fixed', top: '0', left: '0', right: '0'
            }}>
            <>
            <NavbarBrand style={{color:"#fff", fontSize:"24px", 
                textAlign:"start", fontWeight:"bold"}} href="/dashboard"> My App</NavbarBrand>
            </>
        <Nav.Link href="/dashboard"> Dashboard</Nav.Link>
        <Nav.Link href="/profile"> Profile</Nav.Link>
        <Nav.Link href="/signup"> Sign Up</Nav.Link>
        <Nav.Link href="/" onClick={() => {
            localStorage.setItem('userType', data.userType);
            localStorage.setItem('email', '');
        }}> Logout </Nav.Link>
        
        </Container>
      </Navbar>
    </form>

    )
}

export default function Header() {
   const userType = localStorage.getItem('userType'); // 'Logged in' or 'Logged out'
    if (userType === 'Logged in') {
        return <LoggedInHeader />;
    } else {
        return <LoggedOutHeader />;
    }

    
  
}
