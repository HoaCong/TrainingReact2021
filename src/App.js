import React, {Component} from 'react'
import Header from './component/layout/Header'
import Body from './component/layout/Body'
import Footer from './component/layout/Footer'
class App extends Component {
  render() {
    return (
      <React.StrictMode>
          <Header/>
          <Body/>
          <Footer/>
      </React.StrictMode>
    )
  }
}

export default App;