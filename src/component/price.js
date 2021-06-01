import React,{Component} from 'react'
class Price extends Component {
render(){
    return(
    <p className={this.props.className}>{this.props.price} <u>{this.props.unit}</u></p>
)}
}
export default Price