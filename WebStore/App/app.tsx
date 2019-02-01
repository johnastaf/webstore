import * as React from "react";
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './header/header';
import Cart from './cart/cart';
import Catalog from './catalog/catalog';
import Admin from './admin/admin';
import Order from './admin/order';
import UserLogin from './user/userLogin';
import UserRegister from './user/userRegister';

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
                            <Route path="/" component={Catalog} />
                        </Switch>
                    </main>
                </div>
            </Router>
        );
    }
};