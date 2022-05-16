import React, { Component } from "react";
class Price extends Component {
  render() {
    const { className, price, unit } = this.props;
    return (
      <span className={className}>
        {price} <u>{unit}</u>
      </span>
    );
  }
}
export default Price;
