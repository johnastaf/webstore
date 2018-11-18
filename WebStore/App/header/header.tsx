import * as React from 'react';
import { Link } from 'react-router-dom';
import { IPhoneInCart, IStoreState } from "../store/configureStore";
import { connect } from 'react-redux';
import { searchPhones } from '../catalog/catalogActions'
import 'bootstrap/js/src/collapse';
import 'bootstrap/js/src/dropdown';

interface MyProps {
    totalCount: number;
    searchPhones: (query: string) => void;
}

class Header extends React.Component<MyProps, {}> {
    public refs: {
        searchText: HTMLInputElement;
    };

    searchPhones = () => {
        this.props.searchPhones(this.refs.searchText.value);
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">WebStore</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Catalog</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Admin
                             </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to="/admin">Products</Link>
                                <Link className="dropdown-item" to="/order">Orders</Link>
                            </div>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/cart">Cart ({this.props.totalCount})</Link>
                        </li>
                    </ul>
                    <div className="form-inline my-2 my-lg-0">
                        <input ref="searchText" className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.searchPhones}>Search</button>
                    </div>
                </div>
            </nav>
        );
    }
}

let mapProps = (state: IStoreState) => {
    return {
        totalCount: state.cart.totalCount
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    searchPhones: (query: string) => dispatch(searchPhones(query))
});

export default connect(mapProps, mapDispatchToProps)(Header) 