import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {

    return (
      <div className="container home">
        <div className="title">
          <h1 className="center">ISS Info</h1>
        </div>
        <div className="container pages-list">
          <ul>
            <Link to="/current">
              <li className="card center">ISS Current Location</li>
            </Link>
            <Link to="/pass">
              <li className="card center">Find Pass Times by Location</li>
            </Link>
            <Link to="/individuals">
              <li className="card center">Details on Individuals in Space</li>
            </Link>
          </ul>
        </div>
      </div>
    )
  }
}

export default Home;