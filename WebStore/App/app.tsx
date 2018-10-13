import * as React from "react";
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './header/header';
import Cart from './cart/cart';
import Catalog from './catalog/catalog';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <main>
                        <Switch>
                            <Route path="/cart" component={Cart} />
                            <Route path="/" component={Catalog} />
                        </Switch>
                    </main>
                </div>
            </Router>
        );
    }
};