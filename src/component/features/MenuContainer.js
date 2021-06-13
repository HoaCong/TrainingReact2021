import React, { Component } from "react";
import SearchForm from "../common/SearchForm";
import ListProduct from "./ListProduct";
import Search from "../../img/search.png";
import Image from "../common/Image";
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

  activeSr = (data) => {
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
        ? this.activeSr(e.id)
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
        {Data.map((item, index) =>
          item.ListProduct.length > 0 ? (
            <ListProduct
              ProductList={item}
              key={index}
              KeyWord={this.state.keyword}
              category={item.name}
              catID={item.id}
            />
          ) : null
        )}
        <div className="none_data">
          <Image Src={Search} Alt="Logo Cửa Hàng" Size="logo" />
          <div className="none_data_error">
            Rất tiếc chúng tôi không tìm thấy sản phẩm!
          </div>
        </div>
      </section>
    );
  }
}
export default MenuContainer;
