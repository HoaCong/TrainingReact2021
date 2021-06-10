import React, { Component } from "react";
import ItemProduct from "./ItemProduct";

class ListProduct extends Component {
  render() {
    const product = this.props.ProductList;
    const keyword = this.props.KeyWord;
    const list = product.ListProduct.filter((e) =>
      e.product_name.toLowerCase().includes(keyword.toLowerCase())
    );
    if (list.length === 0) {
      return null;
    }
    return (
      <div
        className="box_cat_product"
        key={list.id}
        id={"cate" + this.props.catID}
      >
        <div key={list.id} className="name_category">
          {this.props.category}
        </div>
        <ItemProduct key={list.id} ProductList={list} />
      </div>
    );
  }
}
export default ListProduct;
