import React, { Component } from 'react';
import axios from 'axios';

class Individuals extends Component {
  state = {
    individuals: []
  }

  componentDidMount() {
    axios.get('http://api.open-notify.org/astros.json')
      .then(res => {
        let individuals = [...res.data.people];
        this.setState({
          individuals
        })
      })
  }

  render() {
    let indList = <div className="center loading">Loading Individuals Data...</div>
    const indData = this.state.individuals;
    let indNum = 0;
    if (indData.length > 0) {
      indList = indData.map(individual => {
        return (
          <div className="individual" key={++indNum}>
            <h4 className="data-label">Name: {individual.name} </h4>
          </div>
        )
      })
    }

    return (
      <div className="container center">
        <h2>Individuals Currently in Space</h2>
        <div className="container">
          <div className="card">
            <h4 className="data-label">Total Number: {indNum}</h4>
          </div>
          <div className="card">
            <div className="data">
              {indList}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Individuals;