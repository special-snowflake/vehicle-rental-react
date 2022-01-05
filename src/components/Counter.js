import React from 'react';

class Counter extends React.Component {
  render() {
    return <div id='vehicle-counter'>{this.props.counterNumber}</div>;
  }
}

export default Counter;
