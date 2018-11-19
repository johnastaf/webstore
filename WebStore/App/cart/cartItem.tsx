import * as React from "react";
import { IPhoneInCart } from "../store/configureStore";


interface MyProps {
    phoneInCart: IPhoneInCart;
    removePhoneFromCart: (phone: IPhoneInCart) => void;
}

export class CartItem extends React.Component<MyProps, {}> {
    render() {
        return (

            <li className="list-group-item">
                Model: {this.props.phoneInCart.phone.name} Quantity: {this.props.phoneInCart.quantity}
                <button style={{ marginLeft: '10px' }} type="button" className="btn btn-danger"
                    onClick={() => { this.props.removePhoneFromCart(this.props.phoneInCart) }}>
                    Remove
                 </button>
            </li>
        );
    }
};

