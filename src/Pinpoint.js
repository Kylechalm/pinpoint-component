import React, { Component } from 'react';
import PinpointForm from './Pinpoint-form';
import PinpointMap from './Pinpoint-map';
import './App.css';

const PINPOINT_SERVICE = 'http://0.0.0.0/';

class Pinpoint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lng: 10,
      cache: [],
      gpdname: 'EASE2_M01KM',
      grids: {},
      response: undefined,
      map: undefined,
      marker: undefined,
      tileLayer: undefined,
    };

    this.handleUserClick = this.handleUserClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onMapRender = this.handleMapRender.bind(this);
    this.getPinpointGrids();
  }

  handleUserClick(map) {
    map.on('click', (event) => {
      this.setState({
        lat: event.latlng.lat,
        lng: event.latlng.lng,
      });
    });
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
    const position = [this.state.lat, this.state.lng];
    const cache = position.concat([this.state.gpdname]);

    this.state.map.panTo(position);
    this.state.marker.setLatLng(position);

    if (cache.some((value, index) => value !== this.state.cache[index])) {
      this.pinpointRequest();
      this.setState({
        cache: cache,
      })
    }
  }

  getPinpointGrids() {
    const pinpointGetGrids = PINPOINT_SERVICE + `grids`;

    fetch(pinpointGetGrids, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }).then(
      (response) => response.json()
    ).then(
      (json) => {
        this.setState({
          grids: json
        });
      }
    );
  }

  pinpointRequest(){
    const pinpointRequest = PINPOINT_SERVICE + `convert?latitude=${this.state.lat}&longitude=${this.state.lng}&gpd_name=${this.state.gpdname}`;

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
      }
    );
  }

  render() {
    return (
      <section className="pinpoint">
        <PinpointForm
          lat={this.state.lat}
          lng={this.state.lng}
          gpdname={this.state.gpdname}
          grids={this.state.grids}
          response={this.state.response}
          onInputChange={this.handleInputChange}
          onSubmit={this.handleSubmit} />
        <PinpointMap
          lat={this.state.lat}
          lng={this.state.lng}
          onMapRender={this.onMapRender}
          onUserClick={this.handleUserClick} />
      </section>
    );
  }
}

export default Pinpoint;
