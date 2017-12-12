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
      map: undefined,
      marker: undefined,
      tileLayer: undefined,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onMapRender = this.handleMapRender.bind(this);
  }

  handleMapRender(map, tileLayer, marker) { 
    this.setState({
      map: map,
      marker: marker,
      tileLayer: tileLayer,
    });
  }

  handleInputChange(name, value) {
    this.setState({
      [name]: value
    });
  }

  componentDidUpdate() {
    const position = [this.state.lat, this.state.long];

    this.state.map.panTo(position);
    this.state.marker.setLatLng(position);
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
        <PinpointMap
          lat={this.state.lat}
          long={this.state.long}
          onMapRender={this.onMapRender}>
          <PinpointForm
            lat={this.state.lat}
            long={this.state.long}
            gpdname={this.state.gpdname}
            onInputChange={this.handleInputChange}
            onSubmit={this.handleSubmit} />

        </PinpointMap>
      </section>
    );
  }
}

export default Pinpoint;
