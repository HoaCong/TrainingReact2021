import React, { Component } from "react";
import Header from "./component/layout/Header";
import Body from "./component/layout/BodyFix";
import Login from "./component/layout/Login";
import Footer from "./component/layout/Footer";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
      <Router>
        <Header amount={this.state.totalAmount} />
        <Route
          path="/"
          exact
          render={() => <Body getAmount={this.getAmount} />}
        ></Route>
        {/* 2 cách */}
        <Route path="/login" component={Login} />
        {/* <Route path="/login" render={(props) => <Login {...props} />} /> */}

        <Footer />
      </Router>
    );
  }
}

export default App;
