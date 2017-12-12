import React, { Component } from 'react';
class PinpointForm extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      <div className="pinpoint__input">
        <form onSubmit={this.handleSubmit}>
          <label>
            Lat:
            <input
              name="lat"
              type="text"
              value={this.props.lat}
              onChange={this.handleChange} />
          </label>
          <label>
            Long:
            <input
              name="long"
              type="text"
              value={this.props.long}
              onChange={this.handleChange} />
          </label>
          <label>
            GPD Name:
            <input
              name="gpdname"
              type="text"
              value={this.props.gpdname}
              onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default PinpointForm;
