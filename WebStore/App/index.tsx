import * as React from "react";
import { render } from 'react-dom'
import App from './app'
import { Store, createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import catalog from './catalog/catalogReducers'
import IStoreState from "./store/configureStore";
import 'bootstrap/dist/css/bootstrap.min.css';

const store:Store<IStoreState> = createStore(
  catalog,
  compose(
        applyMiddleware(thunk),
  )
);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('content')
)