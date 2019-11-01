import React, { Component } from 'react';
import './HeaderCell.scss';

export default class HeaderCell extends Component {
  constructor(props) {
    super(props);
    this.state = { direction: 'asc' };
  }

  handleClick(e) {
    const { sortBy, field } = this.props;
    const { direction } = this.state;

    this.switchDirection();
    sortBy(field, direction);
  }

  switchDirection() {
    const { direction } = this.state;

    direction === 'asc' ?
      this.setState({
        direction: 'desc'
      })
      :
      this.setState({
        direction: 'asc'
      });
  }

  render() {
    const { field, active } = this.props;
    const { direction } = this.state;

    return (
      <th
        className={active ? 'header-cell header-cell__highlighted' : 'header-cell'}
        id={field}
        title={`Click to sort by ${field}`}
        onClick={(e) => this.handleClick(e)}>

        {field}
        {active && (direction === "asc" ? "🔼" : "🔽")}
      </th>
    );
  }
}




