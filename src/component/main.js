import React, {Component} from 'react'
import MainContainer from './MainContainer'
import CartContainer from './CartContainer'
class Main extends Component{    
    state = {
        category: [],
        product:[]
    }
    
    componentDidMount() {
        fetch('https://api.thecoffeehouse.com/api/v2/category/web')
        .then((response) => response.json())
        .then(categoryList => {
            this.setState({ category: categoryList });
        });
        fetch('https://api.thecoffeehouse.com/api/v2/menu')
          .then((response) => response.json())
          .then(productList => {
              this.setState({ product: productList.data });
          });
    }
    
    render() {
      const { category } = this.state;
      const { product } = this.state;
      category.map(itemcat => {
            let arr = [];
            product.map(itempro => {
                if (itempro.categ_id.includes(itemcat.id)) {
                    arr.push(itempro);
                }
                return arr;
            })
            itemcat.ListProduct = arr;
            return arr;
        })
      return (
        <div className="main">
        <MainContainer ConcatList={this.state.category}/>
        <CartContainer/>
        </div>
      );        
    }
  }
export default Main;