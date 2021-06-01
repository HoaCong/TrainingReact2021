import React,{Component} from 'react'
import {Link} from "react-scroll";
class ItemCategory extends Component {
render(){
    return(
         this.props.CatList.map(item => item.ListProduct.length > 0 ? (
            <li key={item._id}>
              <Link 
                activeClass="active"
                to={"cate" + item.id}
                spy={true}
                smooth={true}
                offset={- 72}
                duration={800}
                >
                  {item.name}
              </Link>
            </li>

        ):null)
    )}
}
export default ItemCategory