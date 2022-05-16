import React, { Component, memo } from "react";
import ItemCategory from "./ItemCategory";
class ListCategory extends Component {
  render() {
    const { classList, data, active } = this.props;
    return (
      <section className={classList}>
        <ul>
          <ItemCategory CatList={data} active={active} />
        </ul>
      </section>
    );
  }
}

export default memo(ListCategory);
