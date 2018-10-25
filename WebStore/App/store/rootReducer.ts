import { combineReducers, ReducersMapObject } from 'redux'
import { IStoreState } from "./configureStore";
import { catalog } from '../catalog/catalogReducer'
import { cart } from '../cart/cartReducer'
import { Action, Reducer } from 'redux';

export const reducers = {
    catalog: catalog,
    cart: cart
};

export const rootReducer = buildRootReducer(reducers);

function buildRootReducer(allReducers: ReducersMapObject) {
    return combineReducers<IStoreState>(Object.assign({}, reducers,));
}


