import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css';

function Navbar() {
  return (
    <div>
        <nav className='nav'>
            <Link to='/' className='site-logo'>CodePlushub</Link>
            <ul>
                <li>
                    <Link to='/home'>Home</Link>
                </li>
                <li>
                <Link to='/latest-jobs'>Latest jobs</Link>
                </li>
                <li>
                    <Link to='/internships'>Internships</Link>
                </li>
                <li>
                    <Link to='/courses'>Courses</Link>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
                <li>
                    <Link to='/contact'>Contact</Link>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar;