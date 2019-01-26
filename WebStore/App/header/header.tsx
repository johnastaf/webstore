import * as React from 'react';
import { Link } from 'react-router-dom';
import { IStoreState, IUser } from "../store/configureStore";
import { connect } from 'react-redux';
import { searchPhones, getPhones } from '../catalog/catalogActions'
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/dropdown';
import '../style/app.css';
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login'
import { userAutorized } from '../user/userActions';

interface MyProps {
    totalCount: number;
    user: IUser;
    searchPhones: (query: string) => void;
    userAutorized: (user: IUser) => void;
    getPhones: () => void;
}

class Header extends React.Component<MyProps, {}> {
    public refs: {
        searchText: HTMLInputElement;
    };

    componentDidMount() {
        this.props.getPhones();
    }

    searchPhones = () => {
        this.props.searchPhones(this.refs.searchText.value);
    }


    responseFacebook = (userInfo: ReactFacebookLoginInfo) => {
        console.log(JSON.stringify(userInfo));

        if (userInfo.accessToken != null) {
            let user: IUser = {
                isLogged: true,
                name: userInfo.name,
                id: userInfo.id
            }

            this.props.userAutorized(user);
        }
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

                        {this.props.user.isLogged == true &&
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
                        {this.props.user.isLogged && <div>Hello, {this.props.user.name}</div>}
                        {!this.props.user.isLogged &&
                            <FacebookLogin
                                appId="231121177769691"
                                autoLoad
                                callback={this.responseFacebook}
                                size="small"
                                textButton="Login" />
                        }
                    </div>

                    <Link className="nav-link" to="/user">Login</Link>
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
    userAutorized: (user: IUser) => dispatch(userAutorized(user)),
    getPhones: () => dispatch(getPhones())
});

export default connect(mapProps, mapDispatchToProps)(Header) 