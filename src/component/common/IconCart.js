import React, { Component } from "react";
class IconCart extends Component {
  render() {
    return (
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
    );
  }
}
export default IconCart;