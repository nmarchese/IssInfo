import React, { Component } from 'react';
import axios from 'axios';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';

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
    let leafletMap = <div className="center loading">Loading Map data...</div>;
    if (this.state.lat) {
      const position = [this.state.lat, this.state.lon];
      leafletMap = (
          <LeafletMap center={position} zoom="2">
            <TileLayer 
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
            />
            <Marker position={position}>
              <Popup>
                ISS Position...
              </Popup>
            </Marker>
          </LeafletMap>
      )
      posData = (
        <h6>
          <span className="map-pos-data">Latitude: {this.state.lat}</span>
          <span className="map-pos-data">Longitude: {this.state.lon}</span>
          <span className="map-pos-data">Time: {this.props.formatTime(this.state.time)}</span>
        </h6>
      )
    }
    return (
      <div className="container">
        <h2 className='center'>ISS Current Location</h2>
        <div className="card map-card center">
          {leafletMap}
          {posData}
        </div>
      </div>
    )
  }
}
// Ideas for improvement: better map TileLayer? better icon. view range circle. better popup.

export default Current;