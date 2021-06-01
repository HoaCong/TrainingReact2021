import React, {Component} from 'react'
import ListCategory from './ItemCategory'
import InputSearch from "./input"
import ItemProduct from './ItemProduct'

class ListProduct extends Component{
    render(){
        const  product  = this.props.ProductList;
        return(
            <section className={this.props.className}>
                <SearchForm/>
                {product.map(item => item.ListProduct.length > 0 ? (
                    <div className="box_cat_product" key={item.id} id={"cate"+item.id}>
                        <div className="name_category">{item.name}</div>
                        <ItemProduct ProductList={item.ListProduct} />
                    </div> 
                ):null)}
            </section>
        );
    }
}
class SearchForm extends Component{
    render(){
        return(
         <InputSearch 
         className="order_input"
         classIcon="fas fa-search"
         type="text"
         placeholder="Tìm kiếm sản phẩm" />
        );
    }
}
class MainContainer extends Component{
    render(){
        return(
        <div className="main_content"> 
            <ListCategory classList="categories" CatList={this.props.ConcatList}/>
            <ListProduct className="products" ProductList={this.props.ConcatList}/>
        </div>
        );
    }
}
export default MainContainer;