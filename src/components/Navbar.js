import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

class Navbar extends Component {

  toggle = () => {
    var nav = document.getElementById("nav-links");
    if (nav.className === "right nav-list") {
      nav.className += " dropdown";
    } else {
      nav.className = "right nav-list";
    }
  }

  collapse = () => {
    document.getElementById("nav-links").className = "right nav-list";
  }

  render() {
    return (
      <div className="navbar-fixed">
        <nav className="nav-wrapper blue darken-4">
          <div>
            <div className="container">
              <Link to="/" className="brand-logo" onClick={this.collapse}>ISS Info</Link>
            </div>
            <ul className="right nav-list" id="nav-links">
              <li className="nav-toggle" onClick={this.toggle}><i className="material-icons">menu</i></li>
              <li className="nav-elem"><NavLink to="/current" onClick={this.collapse}>Current</NavLink></li>
              <li className="nav-elem"><NavLink to="/pass" onClick={this.collapse}>Pass Times</NavLink></li>
              <li className="nav-elem"><NavLink to="/individuals" onClick={this.collapse}>Individuals in Space</NavLink></li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

export default Navbar;