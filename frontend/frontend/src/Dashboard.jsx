import React from 'react'
import Header from './Header'

function Dashboard() {

  
  return (

    <form>
      <Header />
      
        <div style={{display:'flex', justifyContent:'center', width:'100%',alignItems:'center', height:'100vh'}}>
        <div style={{padding:'15px', borderRadius:'10px', width:'min-content', border:'1px solid #ccc', backgroundColor:'rgba(0, 0, 0, 0.29)'}}>
      <h2 style={{color:'#141539'}}>Dashboard</h2>  
      </div>
    </div>
    </form>
  )
}

export default Dashboard
