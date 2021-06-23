import React, { Component } from "react";
class InputSearch extends Component {
  render() {
    return (
      <input
        value={this.props.value}
        className={this.props.classInput}
        type={this.props.type}
        placeholder={this.props.placeholder}
        name={this.props.name}
        onChange={this.props.onChange}
      />
    );
  }
}
export default InputSearch;
