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
  getDemo(e) {
    this.props.callback(e);
  }
  render() {
    const Address = this.props.Data;

    if (Address.status === "INVALID_REQUEST")
      return (
        <div className="result_order_input result_error">
          <div>Chuỗi không hợp lệ</div>
        </div>
      );
    if (Address.status === "OK")
      return (
        <ul className={"result_order_input " + this.props.className}>
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
    return (
      <div className="result_order_input result_error">
        <div onClick={() => this.getDemo("Thừa Thiên Huế")}>Thừa Thiên Huế</div>
        <div onClick={() => this.getDemo("Đà Nẵng")}>Đà Nẵng</div>
        <div onClick={() => this.getDemo("Hồ Chí Minh")}>Hồ Chí Minh</div>
        <div onClick={() => this.getDemo("Hà Nội")}>Hà Nội</div>
      </div>
    );
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
  openAddress = () => {
    this.setState({
      toogle: true,
    });
  };
  closeAddress = () => {
    this.setState({
      toogle: false,
    });
  };
  callback = (data) => {
    this.setState({
      address: data,
    });
  };
  noneSubmit(e) {
    e.preventDefault();
  }
  changeInput(e) {
    // e.preventDefault();
    this.setState({ address: e.target.value.toLowerCase() });
    fetch(
      `https://order.thecoffeehouse.com/api/location?address=${this.state.address}`
      // `https://api.thecoffeehouse.com/api/v5/map/autocomplete?key=${e.target.value.toLowerCase()}&from=TCH-WEB`
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
              onSubmit={(e) => {
                this.noneSubmit(e);
              }}
              onClick={() => setTimeout(this.openAddress, 200)}
              onBlur={() => setTimeout(this.closeAddress, 200)}
            >
              <i className="fas fa-map-marker-alt"></i>
              <InputSearch
                type="text"
                value={this.state.address}
                placeholder="Nhập địa chỉ giao hàng"
                onChange={(e) => this.changeInput(e)}
              />
            </form>
            {this.state.toogle ? (
              <ListAddress callback={this.callback} Data={getAddress} />
            ) : null}
          </div>
        </div>
        <Button className="login" Text="Đăng nhập" />
      </header>
    );
  }
}
export default Header;
