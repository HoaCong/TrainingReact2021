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
    };
  }
  callbackGetKey = (data) => {
    this.setState({
      keyword: data,
    });
  };

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
              demo={this.demo}
              changeActive={this.props.changeActive}
              active={this.props.active}
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
