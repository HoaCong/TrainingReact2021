import React, { Component } from "react";
import SearchForm from "../common/SearchForm";
import ListProduct from "./ListProduct";
class MenuContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
    };
  }
  getKeyWord = (data) => {
    this.setState({
      keyword: data,
    });
  };
  handleValue(e) {
    this.getKeyWord(e.target.value);
  }

  activeElement = (data) => {
    this.props.changeActive(data);
    if (document.querySelectorAll(".active-cat").length > 0) {
      document.querySelector(".active-cat").classList.remove("active-cat");
    }
    document.getElementById("cate" + data).classList.add("active-cat");
  };
  windowScroll = () => {
    let NodeList = document.querySelectorAll(".box_cat_product");
    let yWindow = window.scrollY + 76; // "+76" vì set height khi chia layout
    NodeList.forEach((e) =>
      document.getElementById(e.id).offsetTop <= yWindow &&
      yWindow <=
        document.getElementById(e.id).offsetTop +
          document.getElementById(e.id).offsetHeight
        ? this.activeElement(e.id)
        : null
    );
  };
  componentDidMount() {
    window.addEventListener("scroll", this.windowScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.windowScroll);
  }
  render() {
    const Data = this.props.ConcatList;
    return (
      <section className={this.props.classMenu}>
        <SearchForm
          className="order_input"
          icon="fas fa-search"
          type="text"
          placeholder="Tìm kiếm sản phẩm"
          onChange={(e) => this.handleValue(e)}
        />

        <ListProduct
          ProductList={Data}
          KeyWord={this.state.keyword}
          toogleOrder={this.props.toogleOrder}
        />
      </section>
    );
  }
}
export default MenuContainer;
