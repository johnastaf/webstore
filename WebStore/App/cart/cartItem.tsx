import * as React from "react";
import { IPhoneInCart } from "../store/configureStore";


interface MyProps {
    phoneInCart: IPhoneInCart;
    removePhoneFromCart: (phone: IPhoneInCart) => void;
}

export class CartItem extends React.Component<MyProps, {}> {
    render() {
        return (
            <div className="row" style={{ marginBottom: '10px' }}>
                <div>{this.props.phoneInCart.phone.name}</div>
                <div style={{ marginLeft: '10px' }}>{this.props.phoneInCart.quantity}</div>
                <button style={{ marginLeft: '10px' }} type="button" className="btn btn-danger"
                    onClick={() => { this.props.removePhoneFromCart(this.props.phoneInCart) }}>
                    Remove
                 </button>
            </div>
        );
    }
};

