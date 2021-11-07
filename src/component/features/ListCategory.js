import React, { Component } from "react";
import ItemCategory from "./ItemCategory";
class ListCategory extends Component {
  render() {
    return (
      <section className={this.props.classList}>
        <ul>
          <ItemCategory CatList={this.props.data} active={this.props.active} />
        </ul>
      </section>
    );
  }
}

export default ListCategory;
