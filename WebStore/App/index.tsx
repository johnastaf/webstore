import * as React from "react";
import { render } from 'react-dom'
import App from './app'
import { Store, createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { rootReducer } from './store/rootReducer'
import { IStoreState } from "./store/configureStore";
import 'bootstrap/dist/css/bootstrap.min.css';
import ReduxToastr from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

const store: Store<IStoreState> = createStore(
    rootReducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);

render(
    <Provider store={store}>
        <div>
            <App />
            <ReduxToastr
                timeOut={4000}
                newestOnTop={false}
                preventDuplicates
                position="top-left"
                transitionIn="fadeIn"
                transitionOut="fadeOut"
                progressBar
                closeOnToastrClick />
        </div>
    </Provider>,
    document.getElementById('content')
)