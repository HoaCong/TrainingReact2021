import React, { Component } from "react";
import MenuContainer from "../features/MenuContainer";
import CartContainer from "../features/CartContainer";
import ListCategory from "../features/ListCategory";
import CateLoading from "../placeholder/CategoriesLoading";
import MenuLoading from "../placeholder/MenuLoading";
class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      allData: [],
      active: null,
    };
  }

  changeActive = (id) => {
    this.setState({
      active: id,
    });
  };

  mergeData = (category, product) => {
    category.map((itemcat) => {
      let arr = [];
      product.map((itempro) => {
        if (itempro.categ_id.includes(itemcat.id)) {
          arr.push(itempro);
        }
        return 0;
      });
      itemcat.ListProduct = arr;
      return 0;
    });
    return category;
  };

  componentDidMount() {
    fetch("https://api.thecoffeehouse.com/api/v2/category/web")
      .then((res) => res.json())
      .then((categories) => {
        fetch("https://api.thecoffeehouse.com/api/v2/menu")
          .then((response) => response.json())
          .then((menus) => {
            const newData = this.mergeData(categories, menus.data);
            this.setState({
              allData: newData,
              isLoaded: true,
              active: newData[0].id,
            });
          });
      });
  }

  render() {
    const { isLoaded, allData } = this.state;
    if (!isLoaded) {
      return (
        <div className="main">
          <CateLoading classList="categories" />
          <MenuLoading classMenu="products" />
          <CartContainer classCart="cart" />
        </div>
      );
    } else if (allData.length === 0) {
      return <div>Error: NONE DATA</div>;
    } else {
      return (
        <div className="main">
          <ListCategory
            classList="categories"
            ConcatList={allData}
            active={this.state.active}
          />
          <MenuContainer
            classMenu="products"
            ConcatList={allData}
            changeActive={this.changeActive}
            active={this.state.active}
          />
          <CartContainer classCart="cart" />
        </div>
      );
    }
  }
}
export default Body;
