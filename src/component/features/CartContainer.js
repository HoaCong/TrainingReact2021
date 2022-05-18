import React, { Component, memo } from "react";
import Button from "../common/Button";
import InputSearch from "../common/Input";
import Price from "../common/Price";
class CartContainer extends Component {
  render() {
    let feeShip = 0;
    const { classCart, totalAmount, listOrder, editItemOrder, totalPrice } =
      this.props;
    return (
      <section className={classCart}>
        <div className="main_cart">
          <div className="box_order">
            <Button
              className="seecart"
              Text="Xem giỏ hàng"
              disabled={totalAmount > 0 ? false : true}
            />
          </div>
          <div className="box_order list_order">
            {listOrder != null
              ? listOrder.map((item, index) => (
                  <div
                    className="ele_order item_order"
                    key={index}
                    onClick={() => editItemOrder(item, index)}
                  >
                    <div className="ele_order box_item_order">
                      <div className="item_amount">{item.amount}</div>
                      <div className="">
                        <h4 className="item_name">{item.product_name}</h4>
                        <p className="list_option">
                          {item.size}
                          {item.topping.map((item) => " + " + item)}
                        </p>
                        <p className="list_option">{item.desc}</p>
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
              <div>Cộng ({totalAmount} món)</div>
              <div>
                <Price className="no-margin" price={totalPrice} unit="đ" />
              </div>
            </div>
            <div className="ele_order">
              <div>Vận chuyển</div>
              <div>
                <Price
                  className="no-margin"
                  price={
                    totalPrice >= 50000 ? (feeShip = 0) : (feeShip = 10000)
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
                price={totalPrice + feeShip}
                unit="đ"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default memo(CartContainer);
