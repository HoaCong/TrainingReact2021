import React, { Component } from "react";
import Button from "../common/Button";
import Image from "../common/Image";
import InputCheckbox from "../common/InputCheckbox";
import Price from "../common/Price";
import SearchForm from "../common/SearchForm";
class OrderContainer extends Component {
  constructor(props) {
    super(props);
    const { size, topping, desc, amount, price, priceTopping, itemOrder } =
      this.props;
    this.state = {
      size: size,
      topping: topping || [],
      desc: desc || "",
      amount: amount || 1,
      price: price || itemOrder.price,
      priceTopping: priceTopping || 0,
      _id: itemOrder._id,
      product_name: itemOrder.product_name,
    };
  }
  setItemOrder = (data) => {
    this.props.toogleOrder(data);
  };
  addOrder = () => {
    this.props.addToCart(this.state);
    this.setItemOrder({});
  };
  calAmount = (num) => {
    let tmpamount = this.state.amount + num;
    if (tmpamount < 1) {
      tmpamount = 0;
    }
    this.setState({
      amount: tmpamount,
    });
  };
  setSize = (size, price) => {
    this.setState({
      size: size,
      price: price,
    });
  };
  setTopping = (name, price) => {
    const { topping, priceTopping } = this.state;
    let tmp = [...topping];
    let tmpPrice = 0;
    topping.includes(name)
      ? (tmp = topping.filter((item) => item !== name)) &&
        (tmpPrice = priceTopping - price)
      : tmp.push(name) && (tmpPrice = priceTopping + price);
    this.setState({
      topping: tmp,
      priceTopping: tmpPrice,
    });
  };
  getDesc = (e) => {
    this.setState({
      desc: e.target.value,
    });
  };
  componentDidMount() {
    if (!this.state.size) {
      let b = document.querySelector("input[checked]").getAttribute("value");
      if (b != null) this.setSize(b, this.state.price);
    }
  }
  render() {
    const itemOrder = this.props.itemOrder;

    return (
      <div className="order_container">
        <div
          className="order_overlay"
          onClick={() => this.setItemOrder({})}
        ></div>
        <div className="order_form">
          <i
            className="fas fa-times btn_close_order"
            onClick={() => this.setItemOrder({})}
          ></i>
          <div className="head_order">
            <Image Size="thumbnail" Src={itemOrder.image} Alt="Ảnh sản phẩm" />
            <article>
              <h4 className="name_product">{itemOrder.product_name}</h4>
              <p className="current_option">{this.state.size}</p>
              <p className="current_option">
                {this.state.topping.map(
                  (item, index) => (index > 0 ? " + " : "") + item
                )}
              </p>
            </article>
          </div>
          <hr />
          <div className="body_order">
            <p>Loại</p>
            {itemOrder.variants.length > 0 ? (
              <div>
                <p>Size -</p>
                <div className="radio_order">
                  {itemOrder.variants.map((item, index) => (
                    <InputCheckbox
                      key={index}
                      checked={
                        this.state.size === item.val ? true : index === 0
                      }
                      style={{ order: item.price }}
                      type="radio"
                      id={item.code}
                      name="size"
                      value={item.val}
                      onClick={() => this.setSize(item.val, item.price)}
                      nameOption={item.val}
                      price={item.price - itemOrder.price}
                    />
                  ))}
                </div>
                <hr />
              </div>
            ) : null}
            {itemOrder.topping_list.length > 0 ? (
              <div>
                <p>Topping -</p>
                <div className="radio_order">
                  {itemOrder.topping_list.map((item, index) => (
                    <InputCheckbox
                      key={index}
                      checked={
                        this.state.topping.includes(item.product_name)
                          ? true
                          : false
                      }
                      type="checkbox"
                      id={item.code}
                      name="topping"
                      value={item.code}
                      onClick={() =>
                        this.setTopping(item.product_name, item.price)
                      }
                      nameOption={item.product_name}
                      price={item.price}
                    />
                  ))}
                </div>
                <hr />
              </div>
            ) : null}
            <SearchForm
              className="order_input order_desc"
              icon="fas fa-pencil-alt"
              type="text"
              placeholder="Thêm ghi chú món này"
              name="description"
              value={this.state.desc || ""}
              onChange={(e) => this.getDesc(e)}
            />
          </div>
          <hr />
          <div className="foot_order">
            <div className="order_amount">
              <i
                className="fas fa-minus-circle"
                onClick={() => this.calAmount(-1)}
              ></i>
              <div className="amount">{this.state.amount}</div>
              <i
                className="fas fa-plus-circle"
                onClick={() => this.calAmount(1)}
              ></i>
            </div>
            <Button
              className="seecart"
              onClick={() => this.addOrder()}
              Text={
                <div className="btn_add_cart">
                  <div className="add_cart">Thêm vào giỏ</div>
                  <Price
                    className="no-margin price_cart"
                    price={
                      (this.state.price + this.state.priceTopping) *
                      this.state.amount
                    }
                    unit="đ"
                  />
                </div>
              }
            />
          </div>
        </div>
      </div>
    );
  }
}
export default OrderContainer;
