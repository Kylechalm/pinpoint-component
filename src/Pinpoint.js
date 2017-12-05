import React, { Component } from 'react';
import PinpointForm from './Pinpoint-form';
import PinpointMap from './Pinpoint-map';
import './App.css';

const PINPOINT_SERVICE = 'http://0.0.0.0/convert';

class Pinpoint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      long: 10,
      gpdname: '',
      response: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(name, value) {
    this.setState({
      [name]: value
    });
  }

  handleSubmit() {
    const pinpointRequest = PINPOINT_SERVICE + `?latitude=${this.state.lat}&longitude=${this.state.long}&gpd_name=${this.state.gpdname}`;

    fetch(pinpointRequest, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }).then(
      (response) => response.json()
    ).then(
      (json) => {
        // const main = document.querySelector('.pinpoint main');
        // main.innerHTML = '';

        // for (const key in json) {
        //   const coordinate = document.createElement('h1');
        //   coordinate.classList.add(`${key}`);
        //   coordinate.innerText = `${key.toUpperCase()}: ${json[key]}`;

        //   main.append(coordinate);
        // }
        this.setState({
          response: json
        });
        console.log(this.state);
      }
    );
  }

  render() {
    return (
      <section className="pinpoint">
        <PinpointForm 
          lat={this.state.lat}
          long={this.state.long}
          gpdname={this.state.gpdname}
          onInputChange={this.handleInputChange}
          onSubmit={this.handleSubmit} /> 
        <PinpointMap
          lat={this.state.lat}
          long={this.state.long} />
      </section>
    );
  }
}

export default Pinpoint;
