import React, { Component } from 'react';
import axios from 'axios';

class Current extends Component {
  state = {
    lat: null,
    lon: null,
    time: null
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
          lat: res.data.iss_position.latitude,
          lon: res.data.iss_position.longitude,
          time: res.data.timestamp
        })
      })
  }

  render() {
    let posData = <div className="center loading">Loading Position data...</div>;
    if (this.state.lat) {
      posData = (
        <div className="container center">
          <div className="card">
            <h4 className="data-label">Latitude: {this.state.lat}</h4>
            <h4 className="data-label">Longitude: {this.state.lon}</h4>
            <h4 className="data-label">Time: {this.props.formatTime(this.state.time)} </h4>
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
// Ideas for improvement: Graphical Map with updated position every 5 sec (Leaflet, Google Maps, etc.)

export default Current;