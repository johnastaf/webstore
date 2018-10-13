import * as React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
    render() {
        return (
            <header>
                <menu>
                    <ul>
                        <li>
                            <Link to="/">Catalog</Link>
                        </li>
                        <li>
                            <Link to="/cart">Cart</Link>
                        </li>
                    </ul>
                </menu>
            </header>
        );
    }
};