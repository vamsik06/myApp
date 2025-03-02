import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Latest_jobs from './pages/Latest-jobs'
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

      </Routes>
    </div>
  )
}

export default App