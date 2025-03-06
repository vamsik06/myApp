import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Latest_jobs from './pages/Latest-jobs'
import Courses from './pages/Courses'
import Contact from './pages/Contact'
import About from './pages/About'
// Add import when you create the component
// import Internships from './pages/Internships'

function App() {
  return (
    <div>
     
     <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/latest-jobs" element={<Latest_jobs />} />
        <Route path="/Courses" element={<Courses />} />
        <Route path="/Contact" element={<Contact/>} />
        <Route path="/About" element={<About />} />
        

      </Routes>
    </div>
  )
}

export default App