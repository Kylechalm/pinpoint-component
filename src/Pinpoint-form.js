import React, { Component } from 'react';
class PinpointForm extends Component {
  constructor(props) {
    super(props);

    this.renderResponse = this.renderResponse.bind(this);
    this.genOptions = this.genOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  renderResponse(response) {
    if (response){
      return [<p>X: {response.horizontal}</p>, <p>y: {response.vertical}</p>]
    }
  }

  genOptions() {
    const options = [];

    for (const grid in this.props.grids) {
      options.push(<option value={grid} key={grid}>{grid}</option>);
    }

    return options;
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.props.onInputChange(name, value);  
  }

  render() {
    return (
      <div className="pinpoint__form">
        <div className="pinpoint__response">
         {this.renderResponse(this.props.response)}
        </div>

        <form onSubmit={this.handleSubmit}>
          <label className="latlng">
            Lat:
            <input
              name="lat"
              type="number"
              value={this.props.lat}
              onChange={this.handleChange} />
          </label>
          <label className="latlng">
            Lng:
            <input
              name="lng"
              type="number"
              value={this.props.lng}
              onChange={this.handleChange} />
          </label>
          <label>
            GPD Name:
            <select
              name="gpdname"
              value={this.props.gpdname}
              onChange={this.handleChange}>
              {this.genOptions()}
            </select>
          </label>
        </form>
      </div>
    );
  }
}

export default PinpointForm;
