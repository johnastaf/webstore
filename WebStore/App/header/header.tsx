import * as React from 'react';
import { Link } from 'react-router-dom';
import { IPhoneInCart, IStoreState } from "../store/configureStore";
import { connect } from 'react-redux';

interface MyProps {
    totalCount: number;
}

class Header extends React.Component<MyProps, {}> {
    render() {
        return (
            <header>
                <menu>
                    <ul>
                        <li>
                            <Link to="/">Catalog</Link>
                        </li>
                        <li>
                            <Link to="/admin">Admin</Link>
                        </li>
                        <li>
                            <Link to="/cart">Cart ({this.props.totalCount})</Link>
                        </li>
                    </ul>
                </menu>
            </header>
        );
    }
}

let mapProps = (state: IStoreState) => {
    return {
        totalCount: state.cart.totalCount
    }
}

export default connect(mapProps, {})(Header) 