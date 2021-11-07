import React, { Component } from "react";
class ItemCategory extends Component {
  render() {
    return this.props.CatList.map((item) =>
      item.ListProduct.length > 0 ? (
        <li key={item._id}>
          <a
            href={"#" + item.id}
            id={"cate" + item.id}
            className={item.id === this.props.active ? "active-cat" : null}
          >
            {item.name}
          </a>
        </li>
      ) : null
    );
  }
}
export default ItemCategory;
