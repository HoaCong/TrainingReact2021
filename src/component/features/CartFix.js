import React, { Component } from "react";
import Button from "../common/Button";
import InputSearch from "../common/Input";
import Price from "../common/Price";
class CartContainer extends Component {
  render() {
    let feeShip = 0;
    return (
      <section className={this.props.classCart}>
        <div className="main_cart">
          <div className="box_order">
            <Button
              className="seecart"
              Text="Xem giỏ hàng"
              disabled={this.props.totalAmount > 0 ? false : true}
            />
          </div>
          <div className="box_order list_order">
            {this.props.listOrder != null
              ? this.props.listOrder.map((item, index) => (
                  <div
                    className="ele_order item_order"
                    key={index}
                    onClick={() => this.props.editItemOrder(item, index)}
                  >
                    <div className="ele_order box_item_order">
                      <div className="item_amount">{item.amount}</div>
                      <div className="">
                        <h4 className="item_name">{item.product_name}</h4>
                        <p className="list_option">
                          {item.size}
                          {item.topping_list.map((e, index) =>
                            item.topping.includes(e.code)
                              ? " + " + e.product_name
                              : null
                          )}
                        </p>
                        <p className="list_option">{item.description}</p>
                      </div>
                    </div>
                    <div>
                      <Price
                        className="no-margin"
                        price={(item.price + item.priceTopping) * item.amount}
                        unit="đ"
                      />
                    </div>
                  </div>
                ))
              : null}
            <div className="ele_order">
              <div>Cộng ({this.props.totalAmount} món)</div>
              <div>
                <Price
                  className="no-margin"
                  price={this.props.totalPrice}
                  unit="đ"
                />
              </div>
            </div>
            <div className="ele_order">
              <div>Vận chuyển</div>
              <div>
                <Price
                  className="no-margin"
                  price={
                    this.props.totalPrice >= 50000
                      ? (feeShip = 0)
                      : (feeShip = 10000)
                  }
                  unit="đ"
                />
              </div>
            </div>
            <div className="ele_order">
              <form action="" className="order_input">
                <InputSearch
                  classInput="no-padding-l"
                  type="text"
                  placeholder="Nhập mã ưu đãi tại đây"
                />
              </form>
              <Button Text="Áp dụng" className="" />
            </div>
          </div>
          <div className="box_order ele_order none_border">
            <div>Tổng cộng</div>
            <div>
              <Price
                className="no-margin strong"
                price={this.props.totalPrice + feeShip}
                unit="đ"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default CartContainer;
