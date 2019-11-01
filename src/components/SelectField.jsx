import React, { Component } from 'react';

export default class SelectField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    }
  }

  handleChange(value) {
    const { handleChange, fieldName } = this.props;

    this.setState({value: value});

    handleChange(fieldName, value);
  }

  render() {
    const { fieldName, collection }  = this.props;

    return (
      <div className="input-group input-group-sm mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">{fieldName}:</span>
        </div>

        <select
          className="custom-select"
          defaultValue={this.props.value}
          onChange={(evt) => this.handleChange(evt.target.value)}
        >
          {collection.map(kind =>
            <option key={kind} value={kind}> {kind} </option>
          )}
        </select>
      </div>
    );
  }
}

