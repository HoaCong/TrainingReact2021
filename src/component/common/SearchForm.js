import React, { Component } from "react";
import InputSearch from "../common/Input";
class SearchForm extends Component {
  handleValue(e) {
    this.props.callback(e.target.value);
  }
  render() {
    return (
      <form action="" className="order_input">
        <i className="fas fa-search"></i>
        <InputSearch
          type="text"
          placeholder="Tìm kiếm sản phẩm"
          onChange={(e) => this.handleValue(e)}
        />
      </form>
    );
  }
}
export default SearchForm;
