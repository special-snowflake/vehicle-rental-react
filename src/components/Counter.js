import React from 'react';

class Counter extends React.Component {
  //   console.log("update");
  render() {
    return <div>{this.props.counterNumber}</div>;
  }
}

export default Counter;
