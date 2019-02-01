import * as React from "react";
import { render } from 'react-dom'
import App from './app'
import { Store, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import { rootReducer } from './store/rootReducer'
import { IStoreState } from "./store/configureStore";
import 'bootstrap/dist/css/bootstrap.min.css';
import ReduxToastr from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

const store: Store<IStoreState> = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

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