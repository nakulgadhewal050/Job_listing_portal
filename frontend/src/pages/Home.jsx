import React from 'react'
import { useSelector } from 'react-redux'
import SeekerDashboard from '../component/SeekerDashboard';
import EmployeeDadhboard from '../component/EmployeeDadhboard';
import Nav from '../component/Nav';

function Home() {
  return (
    <div  className=' bg-[#fff9f6]'>
     <Nav/>
    </div>
  )
}

export default Home