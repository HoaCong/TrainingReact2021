import React, { Component } from "react";
import logo from "../../img/logo.png";
import Button from "../common/Button";
import Image from "../common/Image";
import InputSearch from "../common/Input";
class ItemAddress extends Component {
  render() {
    return (
      <li onClick={this.props.onClick}>
        <i className={this.props.Icon}></i>
        <div>
          <p className="address">{this.props.p_Address}</p>
          <p className="region">{this.props.p_Region}</p>
        </div>
      </li>
    );
  }
}
class ListAddress extends Component {
  getValue(e) {
    this.props.callback(e);
  }

  render() {
    const Address = this.props.Data;

    if (Address.status === "INVALID_REQUEST")
      return (
        <div className="result_order_input result_error">
          Chuỗi không hợp lệ
        </div>
      );
    if (Address.status === "OK")
      return (
        <ul className="result_order_input">
          {Address.predictions.map((item) => (
            <ItemAddress
              onClick={() => this.getValue(item.description)}
              key={item.description}
              location={item.description}
              Icon="fas fa-map-marker-alt"
              p_Address={item.structured_formatting.main_text}
              p_Region={item.structured_formatting.secondary_text}
            />
          ))}
        </ul>
      );
    return <div></div>;
  }
}
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getAddress: [],
      address: "",
      toogle: false,
    };
  }
  toogleOpen = () => {
    this.setState({ toogle: true });
  };
  toogleClose = () => {
    this.setState({ toogle: false });
  };
  handleValue = (e) => {
    this.setState({ address: e.target.value.toLowerCase() });
  };

  callback = (data) => {
    this.setState({
      address: data,
    });
  };

  submitForm(e) {
    e.preventDefault();
    fetch(
      `https://order.thecoffeehouse.com/api/location?address=${this.state.address}`
    )
      .then((response) => response.json())
      .then((ListAddress) => {
        this.setState({ getAddress: ListAddress });
      });
  }
  render() {
    const { getAddress } = this.state;
    console.log(this.state.toogle);
    return (
      <header>
        <Image Src={logo} Alt="Logo Cửa Hàng" Size="logo" />
        <div className="nav_header">
          <Button Text="Giao ngay" />
          <div className="address_search">
            <form
              action="#"
              className="order_input"
              onChange={(e) => {
                this.submitForm(e);
              }}
              onSubmit={(e) => {
                this.submitForm(e);
              }}
              onClick={() => this.toogleOpen()}
              onBlur={() => this.toogleClose()}
            >
              <i className="fas fa-map-marker-alt"></i>
              <InputSearch
                type="text"
                value={this.state.address}
                placeholder="Nhập địa chỉ giao hàng"
                onChange={(e) => this.handleValue(e)}
              />
              {this.state.toogle ? (
                <ListAddress callback={this.callback} Data={getAddress} />
              ) : null}
            </form>
          </div>
        </div>
        <Button className="login" Text="Đăng nhập" />
      </header>
    );
  }
}
export default Header;
