import React, { Component } from 'react';
import axios from 'axios';

class Current extends Component {
  state = {
    data: null // refactor to use lat, long, time
  }

  componentDidMount() {
    this.getPositionData();
    this.interval = setInterval(() => {
      this.getPositionData();
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getPositionData() {
    axios.get('http://api.open-notify.org/iss-now.json')
      .then(res => {
        this.setState({
          data: res.data
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

  render() {
    let posData = <div className="center loading">Loading Position data...</div>;
    let posInfo = this.state.data;
    if (posInfo) {
      posData = (
        <div className="container center">
          <div className="card">
            <h4 className="data-label">Latitude: {posInfo.iss_position.latitude}</h4>
            <h4 className="data-label">Longitude: {posInfo.iss_position.longitude}</h4>
            <h4 className="data-label">Time: {this.formatTime(posInfo.timestamp)} </h4>
          </div>
        </div>
      )
    }
    return (
      <div className="container">
          <h2 className='center'>ISS Current Location</h2>
        {posData}
      </div>
    )
  }
}
// Ideas for improvement: Map with updated position every 5 sec

export default Current;