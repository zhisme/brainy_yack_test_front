import React, { Component } from 'react';
import { DebounceInput } from 'react-debounce-input';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.search,
    }
  }

  searchText(props, state) {
    return props.search === state.value ? state.value : this.setState({value: props.search}) && state.value;
  }

  resetInput() {
    const { handleClick } = this.props;

    this.setState({value: ""});

    handleClick();
  }

  handleChange(value) {
    const { handleChange } = this.props;

    this.setState({value: value});

    handleChange(value);
  }

  render() {
    const value = this.searchText(this.props, this.state);

    return(
      <div className="input-group mb-3">
        <DebounceInput
          minLength={2}
          debounceTimeout={300}
          className="form-control"
          placeholder="Search by text or name"
          onChange={evt => this.handleChange(evt.target.value)}
          value={value}
        />
        <button
          className="btn btn-secondary"
          type="button"
          title="Reset every filter query"
          onClick={() => this.resetInput()}
        >
          Reset
        </button>
      </div>
    );
  }
}

