import React, { Component } from "react";
import logo from "../../img/logo.png";
import Button from "../common/Button";
import Image from "../common/Image";
import SearchForm from "../common/SearchForm";
import OrderTimer from "../features/OrderTimer";
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
    if (this.props.address.length < 5) return <div></div>;
    if (Address.length === 0)
      return (
        <div className="result_order_input result_error">
          <div>Chuỗi không hợp lệ</div>
        </div>
      );
    else
      return (
        <ul className={"result_order_input " + this.props.className}>
          {Address.addresses.map((item) => (
            <ItemAddress
              onClick={() => this.getValue(item.full_address)}
              key={item.full_address}
              Icon="fas fa-map-marker-alt"
              p_Address={item.title_address}
              p_Region={item.full_address}
            />
          ))}
        </ul>
      );
  }
}
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getAddress: [],
      address: "",
      toogleAddress: false,
      toogleTimer: false,
      listDate: [],
      textTimer: "GIAO NGAY",
      today: null,
    };
    this.insideTimer = React.createRef();
  }
  changeTextTimer = (data) => {
    this.setState({
      textTimer: data,
    });
  };
  openAddress = () => {
    this.setState({
      toogleAddress: true,
    });
  };
  closeAddress = () => {
    this.setState({
      toogleAddress: false,
    });
  };
  getThreeDate = () => {
    let day = new Date();
    let nextDay = new Date();
    let tmpList = [];
    let i = 0;
    if (day.getHours() >= 20 && day.getMinutes() >= 15) i = 1;
    for (i; i < 3; i++) {
      nextDay.setDate(day.getDate() + i);
      tmpList.push(nextDay.toLocaleDateString());
    }
    this.setState({
      listDate: tmpList,
      today: day.toLocaleDateString(),
    });
  };
  toogleTimer = () => {
    this.setState({
      toogleTimer: !this.state.toogleTimer,
    });
    this.getThreeDate();
  };
  callback = (data) => {
    this.setState({
      address: data,
    });
  };

  changeInput(e) {
    this.setState({ address: e.target.value });
    fetch(
      `https://api.thecoffeehouse.com/api/v5/map/autocomplete?key=${e.target.value.toLowerCase()}&from=TCH-WEB`,
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9,ja;q=0.8",
          "cache-control": "no-cache",
          pragma: "no-cache",
          "sec-ch-ua":
            '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
          "sec-ch-ua-mobile": "?0",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "tch-app-version": "",
          "tch-device-id": "",
          "x-csrf-token": "XJVEF4AnLtZqcFJ87XeJaV1nJxGC5HrAkMy9QCHA",
          "x-requested-with": "XMLHttpRequest",
        },
        referrer: "https://order.thecoffeehouse.com/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "omit",
      }
    )
      .then((response) => response.json())
      .then((ListAddress) => {
        this.setState({ getAddress: ListAddress });
      });
  }
  checkInside = (e) => {
    if (
      this.insideTimer.current &&
      !this.insideTimer.current.contains(e.target)
    ) {
      this.setState({
        toogleTimer: false,
      });
    }
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.checkInside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.checkInside);
  }
  render() {
    const { getAddress } = this.state;

    return (
      <header>
        <Image Src={logo} Alt="Logo Cửa Hàng" Size="logo" />
        <div className="nav_header">
          <div className="toogle_timer" ref={this.insideTimer}>
            <Button Text={this.state.textTimer} onClick={this.toogleTimer} />
            {this.state.toogleTimer ? (
              <OrderTimer
                listDate={this.state.listDate}
                today={this.state.today}
                changeTextTimer={this.changeTextTimer}
              />
            ) : null}
          </div>
          <div className="address_search">
            <SearchForm
              className="order_input"
              icon="fas fa-map-marker-alt"
              onClick={() => setTimeout(this.openAddress, 200)}
              onBlur={() => setTimeout(this.closeAddress, 200)}
              type="text"
              placeholder="Nhập địa chỉ giao hàng"
              name="address"
              onChange={(e) => this.changeInput(e)}
            />
            {this.state.toogleAddress ? (
              <ListAddress
                callback={this.callback}
                Data={getAddress}
                className=""
                address={this.state.address}
              />
            ) : null}
          </div>
        </div>
        <div className="toogle_timer flex_timer">
          <Button className="login" Text="Đăng nhập" />
          {this.props.amount > 0 ? (
            <div className="flex_timer">
              <div className="total_amount"> {this.props.amount}</div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="7.3" cy="17.3" r="1.4"></circle>
                <circle cx="13.3" cy="17.3" r="1.4"></circle>
                <polyline
                  fill="none"
                  stroke="#000"
                  points="0 2 3.2 4 5.3 12.5 16 12.5 18 6.5 8 6.5"
                ></polyline>
              </svg>
            </div>
          ) : null}
        </div>
      </header>
    );
  }
}
export default Header;
