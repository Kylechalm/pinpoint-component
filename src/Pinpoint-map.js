import React, { Component } from 'react';
import L from 'leaflet';

class PinpointMap extends Component {
  constructor(props) {
    super(props);

    this.renderMap = this.renderMap.bind(this);
  }

  componentDidMount() {
    this.renderMap();
  }

  renderMap() {
    const position = [this.props.lat, this.props.lng];
    const leafletMap = L.map('leaflet-container').setView(position, 2);
    const tileLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(leafletMap);
    const marker = L.circleMarker(position, {'radius': 5}).addTo(leafletMap);

    this.props.onMapRender(leafletMap, tileLayer, marker);
    this.props.onUserClick(leafletMap);
  }

  render() {
    return (
      <div id='leaflet-container'>
        {this.props.children}
      </div>
    );
  }
}

export default PinpointMap;
