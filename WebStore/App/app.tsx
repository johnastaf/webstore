import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './header/header';
import Cart from './cart/cart';
import Catalog from './catalog/catalog';
import Admin from './admin/admin';
import Order from './admin/order';
import UserLogin from './user/userLogin';
import UserRegister from './user/userRegister';
import UserPage from './user/userPage';
import Search from './catalog/search';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <main className="container" style={{ marginTop: '10px' }}>
                        <Switch>
                            <Route path="/cart" component={Cart} />
                            <Route path="/admin" component={Admin} />
                            <Route path="/order" component={Order} />
                            <Route path="/login" component={UserLogin} />
                            <Route path="/register" component={UserRegister} />
                            <Route path="/user" component={UserPage} />
                            <Route path="/search" component={Search} />
                            <Route path="/" component={Catalog} />
                        </Switch>
                    </main>
                </div>
            </Router>
        );
    }
};