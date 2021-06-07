import React, {Component} from 'react'
import Button from "../common/Button"
import InputSearch from "../common/Input"
import Price from "../common/Price"
class CartContainer extends Component{
    render(){
        return(
            <section className={this.props.classCart}>
                <div className="main_cart">
                    <div className="box_order">
                        <Button className="seecart" Text="Xem giỏ hàng" />
                    </div>
                    <div className="box_order">
                        <div className="ele_order">
                            <div>
                                Cộng (0 món)
                            </div>
                            <div>
                            <Price className="no-margin" price="0" unit="đ"/>
                            </div>
                        </div>
                        <div className="ele_order">
                            <div>
                                Vận chuyển
                            </div>
                            <div>
                            <Price className="no-margin" price="10000" unit="đ"/>
                            </div>
                        </div>
                        <div className="ele_order">
                            <InputSearch 
                                className="order_input"
                                classInput="no-padding-l"
                                type="text"
                                placeholder="Nhập mã ưu đãi tại đây" />
                            <Button Text="Áp dụng" />
                        </div>
                    </div>
                    <div className="box_order ele_order none_border">
                        <div>
                            Tổng cộng
                        </div>
                        <div>
                        <Price className="no-margin strong" price="10000" unit="đ"/>
                        </div>
                    </div>
               </div>
            </section>
        );
    }
}
export default CartContainer;