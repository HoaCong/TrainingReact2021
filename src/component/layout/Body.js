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
      indexItem: -1,
      detailOrder: {},
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
    data.forEach(
      (item) =>
        (totalAmount += item.amount) &&
        (totalPrice += (item.price + item.priceTopping) * item.amount)
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
      detailOrder: {},
    });
    this.resetIndexItem();
  };
  editItemOrder = (order, index) => {
    let itemEdit = this.state.menu.find((item) => item._id === order._id);
    this.setState({
      openOrder: !this.state.openOrder,
      itemOrder: itemEdit,
      indexItem: index,
      detailOrder: order,
    });
  };

  compareArr = (arr1, arr2) =>
    JSON.stringify(arr1.sort((a, b) => a.localeCompare(b))) ===
    JSON.stringify(arr2.sort((a, b) => a.localeCompare(b)));

  addToCart = (order) => {
    const tmpOrder = { ...order };
    let tmpListOrder = [...this.state.listOrder];
    let addOrEdit = 1;
    if (this.state.indexItem !== -1) {
      tmpListOrder = tmpListOrder.filter(
        (item, index) => index !== this.state.indexItem
      );
    }
    tmpListOrder.map((item) =>
      item._id === tmpOrder._id &&
      item.size === tmpOrder.size &&
      item.desc === tmpOrder.desc &&
      this.compareArr(item.topping, tmpOrder.topping)
        ? ((item.amount += tmpOrder.amount),
          (item.price = tmpOrder.price),
          (item.priceTopping = tmpOrder.priceTopping),
          (item.desc = tmpOrder.desc),
          (addOrEdit *= -1))
        : (addOrEdit *= 1)
    );
    if (addOrEdit === 1) {
      tmpListOrder = [...tmpListOrder, order].filter((item) => item.amount > 0);
    }
    this.setState({
      listOrder: tmpListOrder,
    });
    localStorage.setItem("cartOrder", JSON.stringify(tmpListOrder));
    this.getAmount(tmpListOrder);
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
      detailOrder,
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
              {...detailOrder}
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
