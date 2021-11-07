import React, { Component } from "react";
import ShowListProduct from "./ShowListProduct";
import Search from "../../img/search.png";
import Image from "../common/Image";
class ListProduct extends Component {
  checkData = (product, keyword) => {
    const list = product.map((e) =>
      e.ListProduct.length > 0
        ? e.ListProduct.filter((i) =>
            i.product_name.toLowerCase().includes(keyword.toLowerCase())
          )
        : null
    );
    let arr = [];
    list.map((item) => (item !== null ? arr.push(item) : null));
    arr.some((item) => {
      return item.length > 0;
    });
  };
  render() {
    const product = this.props.ProductList;
    const keyword = this.props.KeyWord;
    const hasData = this.checkData(product, keyword);

    if (hasData) {
      return (
        <div className="none_data">
          <Image Src={Search} Alt="Logo Cửa Hàng" Size="logo" />
          <div className="none_data_error">
            Rất tiếc chúng tôi không tìm thấy sản phẩm!
          </div>
        </div>
      );
    } else {
      return product.map((item, index) =>
        item.ListProduct.length > 0 ? (
          <ShowListProduct
            ProductList={item}
            key={index}
            KeyWord={keyword}
            category={item.name}
            catID={item.id}
            toogleOrder={this.props.toogleOrder}
          />
        ) : null
      );
    }
  }
}
export default ListProduct;
