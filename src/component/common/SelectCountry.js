import React, { Component } from "react";
import logoCountry from "../../img/country.png";
import InputSearch from "./Input";
import Button from "./Button";
import firebase from "../firebase";
class SelectCountry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      phone: null,
      codeOTP: null,
    };
  }
  changeInput = (e) => {
    const phone = e.target.value;
    this.setState({
      error: phone.length,
    });
    if (phone.length > 8 && phone.length < 12) {
      this.setState({
        phone: phone,
      });
    }
  };
  changeOTP = (e) => {
    this.setState({
      codeOTP: e.target.value,
    });
  };
  login = () => {
    this.props.history.push("/");
  };
  handleClick = () => {
    var recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha");
    var number = `+84${this.state.phone}`;
    this.login();
    if (this.props.login) {
      firebase
        .auth()
        .signInWithPhoneNumber(number, recaptcha)
        .then(function (e) {
          var code = prompt("Nhập mã OTP", "");
          if (code === null) return;
          e.confirm(code)
            .then(function (result) {
              console.log(result.user);
              document.querySelector("div.error").textContent +=
                "Đăng nhập thành công";
            })
            .catch(function (error) {
              console.error(error);
            });
        })
        .catch(function (error) {
          console.error(error);
        });
    } else {
      firebase
        .auth()
        .signInWithPhoneNumber(number, recaptcha)
        .then(function (e) {
          var code = prompt("Nhập mã OTP", "");
          if (code === null) return;
          e.confirm(code)
            .then(function (result) {
              console.log(result.user);
              document.querySelector("div.error").textContent +=
                "Tài khoản đã tồn tại";
            })
            .catch(function (error) {
              console.error(error);
            });
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };
  render() {
    return (
      <>
        <div className="flex_center">
          <button className="btn-select_country">
            <img src={logoCountry} alt="" />
            <span className="code_region">+84</span>
          </button>
          <select className="select_country">
            <option value="+84">+84</option>
          </select>
          <InputSearch
            classInput="phone-number"
            type="number"
            placeholder="Nhập số điện thoại của bạn"
            maxLength="13"
            min="0"
            onChange={(e) => this.changeInput(e)}
          />
        </div>
        <div className="error">
          {this.state.error !== null &&
            (this.state.error < 1
              ? "Không được để trống trường này"
              : this.state.error < 9 || this.state.error > 11
              ? "Giá trị nằm trong khoảng 9-11 số!"
              : null)}
        </div>

        <Button
          onClick={this.handleClick}
          className="submit_login"
          Text={this.props.TextButton}
          disabled={
            this.state.error < 9 || this.state.error > 11 ? true : false
          }
        />
        {/* <form action="/#" onSubmit={this.onSubmitOtp}>
          <InputSearch
            classInput="phone-number"
            type="number"
            placeholder="Nhập OTP"
            maxLength="6"
            min="0"
            onChange={(e) => this.changeInput(e)}
          />
        </form> */}
        <div id="recaptcha"></div>
      </>
    );
  }
}

export default SelectCountry;
