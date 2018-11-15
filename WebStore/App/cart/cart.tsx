import * as React from "react";
import { IPhoneInCart, IStoreState, IOrder } from "../store/configureStore";
import { connect } from 'react-redux';
import { CartItem } from "./cartItem";
import { CreateOrder } from "./createOrder";
import { Dispatch, Action } from 'redux';
import { removePhoneFromCart, createOrder } from "./cartActions"

interface MyProps {
    cart: IPhoneInCart[];
    removePhoneFromCart: (phone: IPhoneInCart) => void;
    createOrder: (order: IOrder) => void;
}


class Cart extends React.Component<MyProps, {}> {
    render() {
        let phonesInCart = this.props.cart.map(item => {
            return (
                <CartItem phoneInCart={item} key={item.phone.name} removePhoneFromCart={this.props.removePhoneFromCart} />
            );
        });

        return (
            <div className="container">
                {phonesInCart}
                <CreateOrder items={this.props.cart} createOrder={this.props.createOrder}/>
            </div>
        );
    }
}

let mapProps = (state: IStoreState) => {
    return {
        cart: state.cart.cart
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    removePhoneFromCart: (phone: IPhoneInCart) => {
        dispatch(removePhoneFromCart(phone));
    },
    createOrder: (order: IOrder) => {
        dispatch(createOrder(order));
    }
});

export default connect(mapProps, mapDispatchToProps)(Cart) 
