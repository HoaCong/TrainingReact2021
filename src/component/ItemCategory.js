import React, {Component} from 'react'
import ItemCategory from './category'
class ListCategory extends Component {
  render() {
      return (
        <section className={this.props.classList}>
          <ul>
           <ItemCategory CatList={this.props.CatList}/>
          </ul>
        </section>
      );
  }
}

export default ListCategory;