import React,{Component} from 'react'
class Image extends Component {
render(){
    return(
    <img className={this.props.Size} src={this.props.Src} alt={this.props.Atl}/>
)}
}
export default Image