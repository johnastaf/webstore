import * as React from 'react';
import { Link } from 'react-router-dom';
import { IStoreState, IUser } from "../store/configureStore";
import { connect } from 'react-redux';
import { searchPhones, getPhones } from '../catalog/catalogActions'
import 'bootstrap/dist/js/bootstrap';
import '../style/app.css';
import { userLogout, validateToken } from '../user/userActions';


interface MyProps {
    totalCount: number;
    user: IUser;
    searchPhones: (query: string) => void;
    getPhones: () => void;
    userLogout: () => void;
    validateToken: (token: string) => void;
}

class Header extends React.Component<MyProps, {}> {
    public refs: {
        searchText: HTMLInputElement;
    };

    componentDidMount() {
        this.props.getPhones();

        if (sessionStorage.getItem("accessToken") != null) {
            this.props.validateToken(sessionStorage.getItem("accessToken"));
        }
    }

    logout = () => {
        this.props.userLogout();
    }

    searchPhones = () => {
        this.props.searchPhones(this.refs.searchText.value);
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">WebStore</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Catalog</Link>
                        </li>

                        {this.props.user.isLogged == true && this.props.user.role === "admin" &&
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Admin
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" to="/admin">Products</Link>
                                    <Link className="dropdown-item" to="/order">Orders</Link>
                                </div>
                            </li>
                        }

                        <li className="nav-item">
                            <Link className="nav-link" to="/cart">Cart ({this.props.totalCount})</Link>
                        </li>
                    </ul>

                    <div className="form-inline my-2 my-lg-0">
                        <input ref="searchText" className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.searchPhones}>Search</button>
                    </div>
                    <div className="form-inline my-2 my-lg-0 left-10px">
                        {this.props.user.isLogged &&

                            <div className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Hello, {this.props.user.name}
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" to="/user">My orders</Link>
                                    <button className="dropdown-item" onClick={this.logout}>Logout</button>
                                </div>
                            </div>

                        }
                        {!this.props.user.isLogged && <Link className="nav-link" to="/login">Login</Link>}
                    </div>
                </div>
            </nav>
        );
    }
}

let mapProps = (state: IStoreState) => {
    return {
        totalCount: state.cart.totalCount,
        user: state.user.user
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    searchPhones: (query: string) => dispatch(searchPhones(query)),
    getPhones: () => dispatch(getPhones()),
    userLogout: () => dispatch(userLogout()),
    validateToken: (token: string) => dispatch(validateToken(token))
});

export default connect(mapProps, mapDispatchToProps)(Header) 