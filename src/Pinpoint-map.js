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
    const position = [this.props.lat, this.props.long];
    const leafletMap = L.map('leaflet-container').setView(position, 2);
    const tileLayer = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: 'abcd',
      minZoom: 1,
      maxZoom: 16,
      ext: 'png' 
    }).addTo(leafletMap);
    const marker = L.circleMarker(position).addTo(leafletMap);

    this.props.onMapRender(leafletMap, tileLayer, marker);
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
