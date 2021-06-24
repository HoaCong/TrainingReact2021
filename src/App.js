import React, { Component } from "react";
import Header from "./component/layout/Header";
import Body from "./component/layout/BodyFix";
import Footer from "./component/layout/Footer";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalAmount: null,
    };
  }
  getAmount = (data) => {
    this.setState({
      totalAmount: data,
    });
  };
  render() {
    return (
      <React.StrictMode>
        <Header amount={this.state.totalAmount} />
        <Body getAmount={this.getAmount} />
        <Footer />
      </React.StrictMode>
    );
  }
}

export default App;
