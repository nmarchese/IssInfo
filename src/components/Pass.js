import React, { Component } from 'react';
import axios from 'axios';

class Pass extends Component {

  state = {
    passes: [],
    hasSearched: false
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      passes: [],
      hasSearched: true
    })
    var params = {
      lat: e.target.lat.value,
      lon: e.target.lon.value,
      alt: e.target.alt.value,
      n: (e.target.passNum.value > 0 ? e.target.passNum.value : 5)
    }
    axios.get('https://cors-anywhere.herokuapp.com/http://api.open-notify.org/iss-pass.json?', { params })
      .then(res => {
        console.log(res.data.response); // for debug, delete later
        let passes = [...res.data.response];
        this.setState({
          passes
        })
      })
  }

  formatTime(timestamp) {
    var date = new Date(timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  }

  formatDuration(timestamp) {
    var minutes = Math.floor(timestamp / 60);
    var seconds = timestamp - (minutes * 60);
    return minutes + 'm' + seconds + 's';
  }

  render() {
    let passList = this.state.hasSearched ? (
      <div className="center loading">Loading Pass Data...</div>
    ) : <div className="center prompt">Enter Position Data for Pass Predictions</div>;
    const passData = this.state.passes;
    let passNum = 0;
    if (passData.length > 0) {
      passList = passData.map(pass => {
        return (
          <div className="pass" key={++passNum}>
            <h5 className="">Pass #{passNum}:</h5>
            <h6 className="data">
              - Rise Time: {this.formatTime(pass.risetime)}  - 
              Pass Duration: {this.formatDuration(pass.duration)}
            </h6>
          </div>
        )
      })
    }
    return (
      <div className="container">
        <h2 className="center">ISS Pass Times</h2>
        <div className="row">
          <div className="column card">
            <h4 className="center">Postion Data</h4>
            <form className="position-form" onSubmit={this.handleSubmit}>
              <input type="text" id="lat" />
              <label htmlFor="lat">Latitude (Decimal Degrees): </label>
              <input type="text" id="lon" />
              <label htmlFor="lon">Longitude (Decimal Degrees): </label>
              <input type="text" id="alt" />
              <label htmlFor="alt">Altitude (Meters): </label> {/* todo: feat? */}
              <input type="text" id="passNum" placeholder="5" />
              <label htmlFor="passNum">Number of Passes to List (1-100): </label>
              <br /><button className="btn blue">Submit</button>
            </form>
          </div>
          <div className="column card">
            <h4 className="center">Pass Data</h4>
            {passList}
          </div>
        </div>
      </div>
    )
  }
}
// Ideas for improvement: paginate passes > 5, default location based on client location,
// build own proxy to get around using https://cors-anywhere.herokuapp.com for CORS issue

export default Pass;