import React, { Component } from "react";
import Button from "../common/Button";
import InputSearch from "../common/Input";
import Price from "../common/Price";
class OrderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listTopping: "",
    };
  }
  setItemOrder = (data) => {
    this.props.toogleOrder(data);
  };
  calAmount = (data) => {
    let amount = this.props.amount + data;
    this.props.changeAmount(amount);
  };
  resetAmount = (data) => {
    this.props.changeAmount(data);
  };
  setSize = (size, price) => {
    this.props.changeSize(size);
    this.props.changePrice(price);
  };
  setTopping = (data) => {
    let a = document.getElementById(data.code);
    if (a.checked) {
      let add = this.state.listTopping.concat(`${data.product_name} + `);
      this.props.changeTopping(add);
      this.setState({
        listTopping: add,
      });
      this.props.changePrice(this.props.price + data.price);
    } else {
      let remove = this.state.listTopping.replace(
        `${data.product_name} + `,
        ""
      );
      this.props.changeTopping(remove);
      this.setState({
        listTopping: remove,
      });
      this.props.changePrice(this.props.price - data.price);
    }
  };
  noneSubmit = (e) => {
    e.preventDefault();
  };
  componentDidMount() {
    let defaultSize = document.querySelector('input[name="size"]');
    if (defaultSize !== null) defaultSize.setAttribute("checked", "checked");

    let b = document
      .querySelector('input[checked="checked"]')
      .getAttribute("value");
    if (b != null) this.setSize(b, this.props.price);
  }
  render() {
    const itemOrder = this.props.itemOrder;
    console.log(this.props.itemOrder);
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
              <p className="current_option">{this.props.size}</p>
              <p className="current_option">
                {this.props.topping !== null
                  ? this.props.topping.slice(0, -2)
                  : null}
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
                    <div
                      className="ele_radio"
                      style={{ order: item.price }}
                      key={index}
                    >
                      <input
                        type="radio"
                        id={item.code}
                        name="size"
                        value={item.val}
                        onClick={() => this.setSize(item.val, item.price)}
                      />

                      {item.price - itemOrder.price > 0 ? (
                        <label className="desc_size" htmlFor={item.code}>
                          {item.val}&nbsp;(+
                          {
                            <Price
                              className="no-margin"
                              price={item.price - itemOrder.price}
                              unit="đ"
                            />
                          }
                          )
                        </label>
                      ) : (
                        <label className="desc_size" htmlFor={item.code}>
                          {item.val}
                        </label>
                      )}
                    </div>
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
                    <div className="ele_radio" key={index}>
                      <input
                        type="checkbox"
                        id={item.code}
                        name="topping"
                        value={item.code}
                        onClick={() => this.setTopping(item)}
                      />
                      <label htmlFor={item.code}>
                        {item.product_name} (+{item.price})
                      </label>
                    </div>
                  ))}
                </div>
                <hr />
              </div>
            ) : null}
            <form
              action=""
              className="order_input order_desc"
              onSubmit={(e) => {
                this.noneSubmit(e);
              }}
            >
              <i className="fas fa-pencil-alt"></i>
              <InputSearch type="text" placeholder="Thêm ghi chú món này" />
            </form>
          </div>
          <hr />
          <div className="foot_order">
            <div className="order_amount">
              <i
                className="fas fa-minus-circle"
                onClick={() => this.calAmount(-1)}
              ></i>
              <div className="amount">{this.props.amount}</div>
              <i
                className="fas fa-plus-circle"
                onClick={() => this.calAmount(1)}
              ></i>
            </div>
            <Button
              className="seecart"
              Text={
                <div className="btn_add_cart">
                  <div className="add_cart">Thêm vào giỏ</div>
                  <Price
                    className="no-margin price_cart"
                    price={this.props.price * this.props.amount}
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
