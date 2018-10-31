import * as React from 'react';
import { Link } from 'react-router-dom';
import { IPhoneInCart, IStoreState } from "../store/configureStore";
import { connect } from 'react-redux';

interface MyProps {
    cart: IPhoneInCart[];
}

class Header extends React.Component<MyProps, {}> {
    render() {
        const reducer = (accumulator: number, currentValue: IPhoneInCart) => accumulator + currentValue.quantity;

        let countPhonesInCart: number = this.props.cart.reduce(reducer, 0);

        return (
            <header>
                <menu>
                    <ul>
                        <li>
                            <Link to="/">Catalog</Link>
                        </li>
                        <li>
                            <Link to="/cart">Cart ({countPhonesInCart})</Link>
                        </li>
                    </ul>
                </menu>
            </header>
        );
    }
}

let mapProps = (state: IStoreState) => {
    return {
        cart: state.cart.cart
    }
}

export default connect(mapProps, {})(Header) 