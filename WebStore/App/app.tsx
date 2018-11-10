import * as React from "react";
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './header/header';
import Cart from './cart/cart';
import Catalog from './catalog/catalog';
import Admin from './admin/admin';

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
                            <Route path="/" component={Catalog} />
                        </Switch>
                    </main>
                </div>
            </Router>
        );
    }
};