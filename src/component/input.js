import React,{Component} from 'react'
class InputSearch extends Component {
render(){
    return(
    <form action="" className={this.props.className}>
        <i className={this.props.classIcon}></i>
        <input className={this.props.classInput} type={this.props.type} placeholder={this.props.placeholder}/>
    </form>
)}
}
export default InputSearch