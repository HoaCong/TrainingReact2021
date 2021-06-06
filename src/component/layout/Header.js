import React, {Component} from 'react'
import logo from "../../img/logo.png";
import Button from "../common/Button"
import Image from "../common/Image"
import InputSearch from "../common/Input"
class Header extends Component {
    render() {
      return (
      <header>
        <Image Src={logo} Alt="Logo Cửa Hàng" Size="logo"/>
        <div>
            <Button Text="Giao hàng" />
            <InputSearch 
            className="order_input"
            classIcon="fas fa-map-marker-alt"
            type="text"
            placeholder="Nhập địa chỉ giao hàng" />
        </div>
        <Button className="login" Text="Giao hàng" />
      </header>
    );
  }
}
export default Header;