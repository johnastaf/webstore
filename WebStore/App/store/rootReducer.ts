import { combineReducers, ReducersMapObject } from 'redux'
import { IStoreState } from "./configureStore";
import { catalog } from '../catalog/catalogReducer'
import { cart } from '../cart/cartReducer'
import { admin } from '../admin/adminReducer'
import { reducer as toastrReducer } from 'react-redux-toastr'

export const reducers = {
    catalog: catalog,
    cart: cart,
    admin: admin,
    toastr: toastrReducer
};

export const rootReducer = buildRootReducer(reducers);

function buildRootReducer(allReducers: ReducersMapObject) {
    return combineReducers<IStoreState>(Object.assign({}, reducers,));
}


