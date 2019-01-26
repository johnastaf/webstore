import * as React from "react";
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './header/header';
import Cart from './cart/cart';
import Catalog from './catalog/catalog';
import Admin from './admin/admin';
import Order from './admin/order';
import UserLogin from './user/userLogin';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <main className="container" style={{ marginTop: '10px' }}>
                        <Switch>
                            <Route path="/cart" component={Cart} />
                            // TODO: restrict access to routes in react-router
                            <Route path="/admin" component={Admin} />
                            <Route path="/order" component={Order} />
                            <Route path="/user" component={UserLogin} />
                            <Route path="/" component={Catalog} />
                        </Switch>
                    </main>
                </div>
            </Router>
        );
    }
};