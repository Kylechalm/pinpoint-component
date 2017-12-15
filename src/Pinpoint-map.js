import React, { Component } from 'react';
import L from 'leaflet';

L.GridLayer.PinpointGridLayer = L.GridLayer.extend({
  createTile: function(coords){
    // create a <canvas> element for drawing
    let tile = L.DomUtil.create('div', 'pinpoint-grid-tile');
    // setup tile width and height according to the options
    let size = this.getTileSize();
    tile.width = size.x;
    tile.height = size.y;
    // return the tile so it can be rendered on screen
    return tile;
  }
});

L.gridLayer.pinpointGridLayer = function(opts) {
    return new L.GridLayer.PinpointGridLayer(opts);
};

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
      ext: 'png',
    }).addTo(leafletMap);
    const marker = L.circleMarker(position).addTo(leafletMap);
    L.gridLayer.pinpointGridLayer().addTo(leafletMap);

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
