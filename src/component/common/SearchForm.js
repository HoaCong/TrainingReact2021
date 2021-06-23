import React, { Component } from "react";
import InputSearch from "../common/Input";
class SearchForm extends Component {
  noneSubmit(e) {
    e.preventDefault();
  }
  render() {
    return (
      <form
        action=""
        className={this.props.className}
        onSubmit={(e) => {
          this.noneSubmit(e);
        }}
        onClick={this.props.onClick}
        onBlur={this.props.onBlur}
        autoComplete="off"
      >
        <i className={this.props.icon}></i>
        <InputSearch
          type={this.props.type}
          classInput={this.props.classInput}
          placeholder={this.props.placeholder}
          value={this.props.value}
          className={this.props.classInput}
          name={this.props.name}
          onChange={this.props.onChange}
        />
      </form>
    );
  }
}
export default SearchForm;
