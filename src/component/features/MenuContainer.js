import React, { Component } from "react";
import SearchForm from "../common/SearchForm";
import ListProduct from "./ListProduct";
class MenuContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      classdemo: "idcate1",
    };
  }
  callbackGetKey = (data) => {
    this.setState({
      keyword: data,
    });
  };

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
        <SearchForm callback={this.callbackGetKey} />
        <ListProduct ProductList={Data} KeyWord={this.state.keyword} />
      </section>
    );
  }
}
export default MenuContainer;
