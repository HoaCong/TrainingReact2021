import React, { Component } from "react";
import Price from "../common/Price";
class InputCheckbox extends Component {
  render() {
    const { checked, type, id, name, value, onClick, nameOption, price } =
      this.props;
    return (
      <div className="ele_radio">
        <input
          defaultChecked={checked}
          type={type}
          id={id}
          name={name}
          value={value}
          onClick={onClick}
        />
        <label htmlFor={id}>
          <span>{nameOption}</span>&nbsp;
          {price > 0 ? (
            <span>
              (+ <Price className="no-margin" price={price} unit="đ" />)
            </span>
          ) : null}
        </label>
      </div>
    );
  }
}
export default InputCheckbox;
