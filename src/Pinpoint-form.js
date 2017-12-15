import React, { Component } from 'react';
class PinpointForm extends Component {
  constructor(props) {
    super(props);

    this.genOptions = this.genOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(event) {
    this.props.onSubmit();
    event.preventDefault();
  }

  render() {
    return (
      <div className="pinpoint__form">
        <form onSubmit={this.handleSubmit}>
          <label className="latlon">
            Lat:
            <input
              name="lat"
              type="number"
              value={this.props.lat}
              onChange={this.handleChange} />
          </label>
          <label className="latlon">
            Long:
            <input
              name="long"
              type="number"
              value={this.props.long}
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
