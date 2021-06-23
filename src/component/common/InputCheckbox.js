import React, { Component } from "react";
import Price from "../common/Price";
class InputCheckbox extends Component {
  render() {
    return (
      <div className="ele_radio" style={this.props.style}>
        <input
          defaultChecked={this.props.checked}
          type={this.props.type}
          id={this.props.id}
          name={this.props.name}
          value={this.props.value}
          onClick={this.props.onClick}
        />
        <label htmlFor={this.props.id} className="ele_radio">
          <span>{this.props.nameOption}</span>&nbsp;
          {this.props.price > 0 ? (
            <span className="order_amount">
              (+
              <Price className="no-margin" price={this.props.price} unit="đ" />)
            </span>
          ) : null}
        </label>
      </div>
    );
  }
}
export default InputCheckbox;
