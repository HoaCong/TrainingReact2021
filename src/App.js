import React, {Component} from 'react'
import Header from './component/header'
import Main from './component/main'
import Footer from './component/footer'
class App extends Component {
  render() {
    return (
      <React.StrictMode>
          <Header/>
          <Main/>
          <Footer/>
      </React.StrictMode>
    )
  }
}

export default App;