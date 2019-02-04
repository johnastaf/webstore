import * as React from "react";
import { IPhoneInCart, IStoreState, IOrder, IUser } from "../store/configureStore";
import { connect } from 'react-redux';
import { CartItem } from "./cartItem";
import { CreateOrder } from "./createOrder";
import { removePhoneFromCart, createOrder, cleanCart } from "./cartActions"

interface MyProps {
    cart: IPhoneInCart[];
    removePhoneFromCart: (phone: IPhoneInCart) => void;
    createOrder: (order: IOrder) => void;
    cleanCart: () => void;
    user: IUser;
}


class Cart extends React.Component<MyProps, {}> {
    render() {
        let phonesInCart = this.props.cart.map(item => {
            return (
                <CartItem phoneInCart={item} key={item.phone.name} removePhoneFromCart={this.props.removePhoneFromCart} />
            );
        });

        const reducer = (accumulator: number, currentValue: IPhoneInCart) => accumulator + currentValue.quantity * currentValue.phone.price;
        let total: number = this.props.cart.reduce(reducer, 0);

        return (
            <div className="container">
                <ul className="list-group list-group-flush">
                    {phonesInCart}
                </ul>
                <br />
                {this.props.cart.length > 0 && <div>Total: {total}$</div>}
                <br />
                {this.props.cart.length > 0 && <CreateOrder user={this.props.user} items={this.props.cart} createOrder={this.props.createOrder} cleanCart={this.props.cleanCart} />}
                {this.props.cart.length ==  0 && "The cart is empty"}
            </div>
        );
    }
}

let mapProps = (state: IStoreState) => {
    return {
        cart: state.cart.cart,
        user: state.user.user
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    removePhoneFromCart: (phone: IPhoneInCart) => {
        dispatch(removePhoneFromCart(phone));
    },
    createOrder: (order: IOrder) => {
        dispatch(createOrder(order));
    },
    cleanCart: () => {
        dispatch(cleanCart());
    }
});

export default connect(mapProps, mapDispatchToProps)(Cart) 
