import React, { Component } from 'react';

export default class EditField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    }
  }

  handleChange(fieldName, value) {
    const { handleChange } = this.props;

    this.setState({value: value});

    handleChange(fieldName, value);
  }

  render() {
    const { fieldName }  = this.props;
    const { value } = this.state;

    return (
      <div className="input-group input-group-sm mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">{fieldName}:</span>
        </div>

        <input
          type="text"
          value={value}
          onChange={(evt) => this.handleChange(fieldName, evt.target.value)}
          className="form-control"
          aria-label="Small"
        />
      </div>
    );
  }
}

