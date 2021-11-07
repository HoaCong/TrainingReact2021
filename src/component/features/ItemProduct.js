import React, { Component } from "react";
import Price from "../common/Price";
import Image from "../common/Image";
class ItemProduct extends Component {
  render() {
    const product = this.props.ProductList;
    return product.map((item) => (
      <div className="ele_product" key={item._id}>
        <Image Size="thumbnail" Src={item.image} Atl={item.product_name} />
        <article>
          <h4>{item.product_name}</h4>
          <p className="description">{item.description}</p>
          <Price price={item.price} unit="đ" />
          <i
            className="fas fa-plus-circle"
            onClick={() => this.props.toogleOrder(item)}
          ></i>
        </article>
      </div>
    ));
  }
}

export default ItemProduct;
