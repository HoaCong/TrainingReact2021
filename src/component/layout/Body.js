import React, { Component } from "react";
import MenuContainer from "../features/MenuContainer";
import CartContainer from "../features/CartContainer";
import OrderContainer from "../features/OrderContainer";
import ListCategory from "../features/ListCategory";
import CateLoading from "../placeholder/CategoriesLoading";
import MenuLoading from "../placeholder/MenuLoading";

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //fetch API
      isLoaded: false,
      allData: [],
      active: null,
      // Order
      order: false,
      itemOrder: [],
      amount: 1,
      size: null,
      topping: null,
      price: null,
    };
  }
  toogleOrder = (data) => {
    this.setState({
      order: !this.state.order,
      itemOrder: data,
      price: data.price,
      topping: null,
      amount: 1,
    });
  };
  changeActive = (id) => {
    this.setState({
      active: id,
    });
  };
  changeSize = (data) => {
    this.setState({
      size: data,
    });
  };
  changeTopping = (data) => {
    this.setState({
      topping: data,
    });
  };
  changePrice = (data) => {
    this.setState({
      price: data,
    });
  };
  changeAmount = (data) => {
    if (data < 1) {
      this.setState({
        amount: 1,
      });
    } else {
      this.setState({
        amount: data,
      });
    }
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
            toogleOrder={this.toogleOrder}
          />
          <CartContainer classCart="cart" />
          {this.state.order ? (
            <OrderContainer
              toogleOrder={this.toogleOrder}
              itemOrder={this.state.itemOrder}
              size={this.state.size}
              changeSize={this.changeSize}
              topping={this.state.topping}
              changeTopping={this.changeTopping}
              price={this.state.price}
              changePrice={this.changePrice}
              amount={this.state.amount}
              changeAmount={this.changeAmount}
            />
          ) : null}
        </div>
      );
    }
  }
}
export default Body;
