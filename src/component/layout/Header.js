import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import Button from "../common/Button";
import IconCart from "../common/IconCart";
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
    const { Data, className, address } = this.props;
    if (address.length < 6 || Data === null) return <div></div>;
    if (Data.length === 0)
      return (
        <div className="result_order_input result_error">
          <div>Chuỗi không hợp lệ</div>
        </div>
      );
    return (
      <ul className={"result_order_input " + className}>
        {Data.map((location) => (
          <ItemAddress
            onClick={() => this.getValue(location.full_address)}
            key={location.full_address}
            Icon="fas fa-map-marker-alt"
            p_Address={location.title_address}
            p_Region={location.full_address}
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
      getAddress: null,
      address: "",
      toogleAddress: false,
      toogleTimer: false,
      listDate: [],
      textTimer: "GIAO NGAY",
      today: null,
    };
    this.debounceChangeInput = React.createRef(null);
    this.insideTimer = React.createRef();
  }
  changeTextTimer = (data) => {
    this.setState({
      textTimer: data,
    });
    localStorage.setItem("timer_order", data);
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
  searchApiAddress = (key) => {
    fetch(
      `https://api.thecoffeehouse.com/api/v5/map/autocomplete?key=${key}&from=TCH-WEB`,
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
        this.setState({ getAddress: ListAddress.addresses });
      });
  };
  changeInput(e) {
    const key = e.target.value;
    this.setState({ address: key });
    if (key.length > 5) {
      if (this.debounceChangeInput.current) {
        clearTimeout(this.debounceChangeInput.current);
      }
      this.debounceChangeInput.current = setTimeout(() => {
        this.searchApiAddress(key);
      }, 500);
    }
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
    if (localStorage.getItem("timer_order")) {
      this.setState({
        textTimer: localStorage.getItem("timer_order"),
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.checkInside);
  }
  render() {
    const {
      getAddress,
      textTimer,
      toogleTimer,
      listDate,
      today,
      address,
      toogleAddress,
    } = this.state;
    return (
      <header>
        <Link to="/">
          <Image Src={logo} Alt="Logo Cửa Hàng" Size="logo" />
        </Link>
        <div className="nav_header">
          <div className="toogle_timer" ref={this.insideTimer}>
            <Button Text={textTimer} onClick={this.toogleTimer} />
            {toogleTimer ? (
              <OrderTimer
                listDate={listDate}
                today={today}
                changeTextTimer={this.changeTextTimer}
              />
            ) : null}
          </div>
          <div className="address_search">
            <SearchForm
              className="order_input"
              icon="fas fa-map-marker-alt"
              onClick={() => setTimeout(this.openAddress, 150)}
              onBlur={() => setTimeout(this.closeAddress, 150)}
              type="text"
              placeholder="Nhập địa chỉ giao hàng"
              name="address"
              value={address || ""}
              onChange={(e) => this.changeInput(e)}
            />
            {toogleAddress ? (
              <ListAddress
                callback={this.callback}
                Data={getAddress}
                className=""
                address={address}
              />
            ) : null}
          </div>
        </div>
        <div className="toogle_timer flex_timer">
          <Link to="/login">
            <Button className="login" Text="Đăng nhập" />
          </Link>
          {this.props.amount > 0 ? (
            <div className="flex_timer">
              <div className="total_amount"> {this.props.amount}</div>
              <IconCart />
            </div>
          ) : null}
        </div>
      </header>
    );
  }
}
export default Header;
