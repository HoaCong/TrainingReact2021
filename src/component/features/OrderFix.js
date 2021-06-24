import React, { Component } from "react";
import Button from "../common/Button";
import Price from "../common/Price";
import InputCheckbox from "../common/InputCheckbox";
import SearchForm from "../common/SearchForm";
class OrderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: this.props.size,
      topping: this.props.topping,
      desc: this.props.desc,
      amount: this.props.amount,
      price: this.props.price,
      priceTopping: this.props.priceTopping,
    };
  }
  setItemOrder = (data) => {
    this.props.toogleOrder(data);
  };
  addOrder = () => {
    this.props.addListOrder(
      this.props.itemOrder.product_name,
      this.state.size,
      this.state.topping,
      this.state.desc,
      this.state.amount,
      this.state.priceTopping,
      this.state.price
    );
    this.setItemOrder(0);
  };
  calAmount = (data) => {
    let tmpamount = this.state.amount + data;
    if (tmpamount < 1) {
      this.setState({
        amount: 0,
      });
    } else {
      this.setState({
        amount: tmpamount,
      });
    }
  };
  setSize = (size, price) => {
    this.setState({
      size: size,
      price: price,
    });
  };
  setTopping = (data) => {
    let tmp = [...this.state.topping];
    this.state.topping.includes(data.code)
      ? (tmp = this.state.topping.filter((item) => item !== data.code)) &&
        this.setState({
          topping: tmp,
          priceTopping: this.state.priceTopping - data.price,
        })
      : tmp.push(data.code) &&
        this.setState({
          topping: tmp,
          priceTopping: this.state.priceTopping + data.price,
        });
  };
  getDesc = (e) => {
    this.setState({
      desc: e.target.value,
    });
  };

  componentDidMount() {
    if (this.state.size === null) {
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
          onClick={() => this.setItemOrder(0)}
        ></div>
        <div className="order_form">
          <i
            className="fas fa-times btn_close_order"
            onClick={() => this.setItemOrder(0)}
          ></i>
          <div className="head_order">
            <img src={itemOrder.image} width="80" height="80" alt="" />
            <article>
              <h4 className="name_product">{itemOrder.product_name}</h4>
              <p className="current_option">{this.state.size}</p>
              <p className="current_option">
                {itemOrder.topping_list.map((item, index) =>
                  this.state.topping.includes(item.code)
                    ? item.product_name +
                      (index < this.state.topping.length - 1 ? " + " : "")
                    : null
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
                        this.state.topping.includes(item.code) ? true : false
                      }
                      type="checkbox"
                      id={item.code}
                      name="topping"
                      value={item.code}
                      onClick={() => this.setTopping(item)}
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
              onChange={(e) => this.getDesc(e)}
              value={this.props.desc ? this.props.desc : undefined}
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
