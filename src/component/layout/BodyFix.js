import React, { Component } from "react";
import MenuContainer from "../features/MenuContainer";
import CartContainer from "../features/CartFix";
import OrderContainer from "../features/OrderFix";
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
      listOrder: [],
      size: null,
      topping: [],
      desc: null,
      amount: 1,
      price: null,
      indexItem: -1,
      priceTopping: null,
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
    if (data.length >= 0) {
      data.map(
        (item) => (totalAmount += item.amount) && (totalPrice += item.price)
      );
      this.props.getAmount(totalAmount);
    }
  };
  addListOrder = (
    product_name,
    size,
    topping,
    description,
    amount,
    priceTopping,
    price
  ) => {
    let obj = {
      product_name: product_name,
      productOrder: this.state.itemOrder,
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
      this.setState({
        listOrder: tmpCart,
      });
    }
    let a = 1;
    tmpCart.map((item) =>
      item.product_name === product_name &&
      item.size === size &&
      item.description === description &&
      JSON.stringify(item.topping) === JSON.stringify(topping)
        ? ((item.amount += amount),
          (item.price = price),
          (item.priceTopping = priceTopping),
          (a *= -1),
          (item.description = description))
        : (a *= 1)
    );
    if (a === 1) {
      let cartItem = [...tmpCart, obj].filter((item) => item.amount > 0);
      this.setState({
        listOrder: cartItem,
      });
    }
    this.resetIndexItem();
    // if (this.state.listOrder.length === 0) {
    //   if (amount > 0) {
    //     this.setState({
    //       listOrder: [...this.state.listOrder, obj],
    //     });
    //     this.getAmount([...this.state.listOrder, obj]);
    //   }
    // } else {
    //   if (this.state.indexItem >= 0 && amount > 0) {
    //     this.state.listOrder.map((item, index) =>
    //       item.product_name === product_name && this.state.indexItem === index
    //         ? ((item.amount = amount),
    //           (item.size = size),
    //           (item.price = price),
    //           (item.topping = topping),
    //           (item.priceTopping = priceTopping),
    //           (item.description = description))
    //         : null
    //     );
    //     this.getAmount(this.state.listOrder);
    //     this.resetIndexItem();
    //   } else {
    //     if (this.state.indexItem >= 0 && amount === 0) {
    //       let removeItem = this.state.listOrder.filter(
    //         (item, index) => index !== this.state.indexItem
    //       );
    //       this.setState({
    //         listOrder: removeItem,
    //       });
    //       this.getAmount(removeItem);
    //       this.resetIndexItem();
    //     } else {
    //       let a = 1;
    //       this.state.listOrder.map((item) =>
    //         item.product_name === product_name &&
    //         item.size === size &&
    //         JSON.stringify(item.topping) === JSON.stringify(topping)
    //           ? ((item.amount += amount),
    //             (item.price += price),
    //             (a *= -1),
    //             (item.description = description))
    //           : (a *= 1)
    //       );
    //       this.getAmount(this.state.listOrder);
    //       if (a === 1) {
    //         this.setState({
    //           listOrder: [...this.state.listOrder, obj],
    //         });
    //         this.getAmount([...this.state.listOrder, obj]);
    //       }
    //     }
    //   }
    // }
  };
  toogleOrder = (data) => {
    this.setState({
      order: !this.state.order,
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
    this.setState({
      order: !this.state.order,
      itemOrder: data.productOrder,
      size: data.size,
      topping: data.topping,
      // desc: data.description,
      amount: data.amount,
      price: data.price,
      priceTopping: data.priceTopping,
      indexItem: index,
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
            toogleOrder={this.toogleOrder}
          />
          {this.state.order ? (
            <OrderContainer
              toogleOrder={this.toogleOrder}
              itemOrder={this.state.itemOrder}
              addListOrder={this.addListOrder}
              size={this.state.size}
              topping={this.state.topping}
              desc={this.state.desc}
              amount={this.state.amount}
              price={this.state.price}
              editItem={this.state.editItem}
              priceTopping={this.state.priceTopping}
            />
          ) : null}
          <CartContainer
            classCart="cart"
            listOrder={this.state.listOrder}
            editItemOrder={this.editItemOrder}
          />
        </div>
      );
    }
  }
}
export default Body;
