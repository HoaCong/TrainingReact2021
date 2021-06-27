import React, { Component } from "react";
class Button extends Component {
  render() {
    return (
      <button
        className={"" + this.props.className}
        onClick={this.props.onClick}
        disabled={this.props.disabled}
      >
        {this.props.Text}
      </button>
    );
  }
}
export default Button;
