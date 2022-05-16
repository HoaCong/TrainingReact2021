import React, { Component, memo } from "react";
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
      menu: [],
      // Order
      openOrder: false,
      listOrder: [],
      itemOrder: {},
      size: null,
      topping: [],
      desc: null,
      amount: 1,
      price: null,
      indexItem: -1,
      priceTopping: null,
      // totalAmount&Price
      totalAmount: 0,
      totalPrice: 0,
    };
  }
  resetIndexItem = () => {
    this.setState({
      indexItem: -1,
    });
  };

  getAmount = (data) => {
    let totalAmount = 0,
      totalPrice = 0;
    data.map(
      (item) =>
        (totalAmount += item.amount) && (totalPrice += item.price * item.amount)
    );
    this.props.getAmount(totalAmount);
    this.setState({
      totalAmount: totalAmount,
      totalPrice: totalPrice,
    });
  };

  toogleOrder = (data) => {
    this.setState({
      openOrder: !this.state.openOrder,
      itemOrder: data,
      size: null,
      topping: [],
      desc: null,
      amount: 1,
      priceTopping: 0,
      price: data.price,
    });
    this.resetIndexItem();
  };
  editItemOrder = (data, index) => {
    let itemEdit = this.state.menu.filter((item) => item._id === data._id);
    this.setState({
      openOrder: !this.state.openOrder,
      itemOrder: itemEdit[0],
      size: data.size,
      topping: data.topping,
      desc: data.description,
      amount: data.amount,
      price: data.price,
      priceTopping: data.priceTopping,
      indexItem: index,
    });
  };
  addToCart = (
    _id,
    product_name,
    size,
    topping,
    description,
    amount,
    priceTopping,
    price
  ) => {
    let obj = {
      _id,
      product_name: product_name,
      topping_list: this.state.itemOrder.topping_list,
      size: size,
      topping: topping,
      description: description,
      amount: amount,
      priceTopping: priceTopping,
      price: price,
    };

    let tmpCart = this.state.listOrder;
    if (this.state.indexItem !== -1) {
      tmpCart = tmpCart.filter((item, index) => index !== this.state.indexItem);
    }
    let addOrEdit = 1;
    tmpCart.map((item) =>
      item._id === _id &&
      item.size === size &&
      item.description === description &&
      (item.topping.length > 1
        ? item.topping.length === topping.length
        : JSON.stringify(item.topping) === JSON.stringify(topping))
        ? ((item.amount += amount),
          (item.price = price),
          (item.priceTopping = priceTopping),
          (addOrEdit *= -1),
          (item.description = description))
        : (addOrEdit *= 1)
    );
    if (addOrEdit === 1) {
      this.setState({
        listOrder: [...tmpCart, obj].filter((item) => item.amount > 0),
      });
      localStorage.setItem(
        "cartOrder",
        JSON.stringify([...tmpCart, obj].filter((item) => item.amount > 0))
      );
      this.getAmount([...tmpCart, obj].filter((item) => item.amount > 0));
    } else {
      this.setState({
        listOrder: tmpCart,
      });
      localStorage.setItem("cartOrder", JSON.stringify(tmpCart));
      this.getAmount(tmpCart);
    }
    this.resetIndexItem();
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
              menu: menus.data,
              isLoaded: true,
              active: newData[0].id,
            });
          });
      });
    const cartOrder = localStorage.getItem("cartOrder");
    if (cartOrder) {
      this.setState({
        listOrder: JSON.parse(cartOrder),
      });
      this.getAmount(JSON.parse(cartOrder));
    }
  }

  render() {
    const {
      isLoaded,
      allData,
      totalPrice,
      totalAmount,
      active,
      openOrder,
      itemOrder,
      size,
      topping,
      desc,
      amount,
      price,
      priceTopping,
      listOrder,
    } = this.state;

    if (!isLoaded) {
      return (
        <div className="main">
          <CateLoading classList="categories" />
          <MenuLoading classMenu="products" />
          <CartContainer
            classCart="cart"
            totalPrice={totalPrice}
            totalAmount={totalAmount}
          />
        </div>
      );
    } else if (allData.length === 0) {
      return <div>Error: NONE DATA</div>;
    } else {
      return (
        <div className="main">
          <ListCategory classList="categories" data={allData} active={active} />
          <MenuContainer
            classMenu="products"
            data={allData}
            active={active}
            toogleOrder={this.toogleOrder}
          />
          {openOrder ? (
            <OrderContainer
              toogleOrder={this.toogleOrder}
              addToCart={this.addToCart}
              itemOrder={itemOrder}
              size={size}
              topping={topping}
              desc={desc}
              amount={amount}
              price={price}
              priceTopping={priceTopping}
            />
          ) : null}
          <CartContainer
            classCart="cart"
            listOrder={listOrder}
            editItemOrder={this.editItemOrder}
            totalPrice={totalPrice}
            totalAmount={totalAmount}
          />
        </div>
      );
    }
  }
}
export default memo(Body);
