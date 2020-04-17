import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="nav-wrapper blue darken-4">
      <div>
        <div className="container">
          <Link to="/" className="brand-logo">ISS Info</Link>
        </div>
        <ul className="right">
          <li><NavLink exact to="/">Home</NavLink></li>
          <li><NavLink to="/current">Current</NavLink></li>
          <li><NavLink to="/pass">Pass Times</NavLink></li>
          <li><NavLink to="/individuals">Individuals in Space</NavLink></li>
        </ul>
      </div>
    </nav>
  )
}
// Ideas for improvement: more mobile friendly (hamburger menu at low width)

export default Navbar;