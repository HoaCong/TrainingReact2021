import React, {Component} from 'react'
import InputSearch from "../common/Input"
import ItemProduct from './ItemProduct'

class ListProduct extends Component{
    render(){
        const  product  = this.props.ProductList;
        return(
            product.map(item => item.ListProduct.length > 0 ? (
                <div className="box_cat_product" key={item.id} id={"cate"+item.id}>
                    <div className="name_category">{item.name}</div>
                    <ItemProduct ProductList={item.ListProduct} />
                </div> 
            ):null)
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
class MenuContainer extends Component{
    render(){
        return(
            <section className={this.props.classMenu}>
                <SearchForm/>
                <ListProduct ProductList={this.props.ConcatList}/>
            </section>
        );
    }
}
export default MenuContainer;