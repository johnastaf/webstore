import * as React from "react";
import { IPhoneInCart, IStoreState } from "../store/configureStore";
import { connect } from 'react-redux';
import { CartItem } from "./cartItem";
import { Dispatch, Action } from 'redux';
import { removePhoneFromCart } from "./cartActions"

interface MyProps {
    cart: IPhoneInCart[];
    removePhoneFromCart: (phone: IPhoneInCart) => void;
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
    }
});

export default connect(mapProps, mapDispatchToProps)(Cart) 
