import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css';

function Navbar() {
  return (
    <div>
        <nav className='nav'>
            <a href='/' className='site-logo'>CodePlushub</a>
            <ul>
                <li>
                    <a href='/home'>Home</a>
                </li>
                <li>
                <a href='/latest-jobs'>Latest jobs</a>
                </li>
                <li>
                    <a href='/internships'>Internships</a>
                </li>
                <li>
                    <a href='/courses'>Courses</a>
                </li>
                <li>
                    <a href='/about'>About</a>
                </li>
                <li>
                    <a href='/contact'>Contact</a>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar;