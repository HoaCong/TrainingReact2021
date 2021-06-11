import React, { Component } from "react";
// import {Link} from "react-scroll";
class ItemCategory extends Component {
  getValue = (data) => {
    this.props.changeActive(data);
  };

  render() {
    // console.log("item: " + this.props.active);
    return this.props.CatList.map((item) =>
      item.ListProduct.length > 0 ? (
        // <li key={item._id}>
        //   <Link
        //     activeClass="active"
        //     to={"cate" + item.id}
        //     spy={true}
        //     smooth={true}
        //     offset={- 72}
        //     duration={800}
        //     >
        //       {item.name}
        //   </Link>
        // </li>
        <li key={item._id}>
          <a
            href={"#" + item.id}
            id={"cate" + item.id}
            onClick={() => this.getValue(item.id)}
            className={this.props.active === item.id ? "active-cat" : null}
          >
            {item.name}
          </a>
          {/* {console.log("itemid: " + item.id)} */}
        </li>
      ) : null
    );
  }
}
export default ItemCategory;
