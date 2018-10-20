import * as React from "react";
import { IStoreState, IPhoneInCart } from "../store/configureStore";
import { connect } from 'react-redux';

interface MyProps {
    cart: IPhoneInCart[];
}


class Cart extends React.Component<MyProps, {}> {
    render() {
        let phonesInCart = this.props.cart.map(item => {
            return (
                <div key={item.phone.name} >
                    {item.phone.name} - {item.quantity}
                </div>
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
        cart: state.cart
    }
}

export default connect(mapProps, null)(Cart) 
