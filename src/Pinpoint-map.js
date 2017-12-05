import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

class PinpointMap extends Component {
  render() {
    const position = [this.props.lat, this.props.long];
    return (
      <Map center={position} zoom='1'>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={position}>
          <Popup>
            <span>{position[0]}, {position[1]}</span>
          </Popup>
        </Marker>
      </Map>
    );
  }
}

export default PinpointMap;
