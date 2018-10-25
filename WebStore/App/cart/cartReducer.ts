import { GET_PHONES_SUCCESS, GET_PHONES_ERROR, ADD_PHONE_TO_CART } from '../catalog/catalogConstants'
import { IPhoneInCart } from "../store/configureStore";
import { Action, Reducer } from 'redux';

const initialState: ICartState = {
    cart: []
}

export interface ICartState {
    cart: IPhoneInCart[];
}

export const cart: Reducer<ICartState> = (state: ICartState = initialState, action: any) => {
    switch (action.type) {
        case ADD_PHONE_TO_CART:
            if (state !== undefined && state != null
                && state.cart !== undefined && state.cart !== null && state.cart.length > 0) {
                let index: any = state.cart.findIndex(p => p.phone.name === action.addedPhone.phone.name);

                if (index > -1) {
                    state.cart[index].quantity = state.cart[index].quantity + 1;

                    return state;
                }
            }

            return { ...state, cart: [...state.cart, action.addedPhone] }

        default:
            return state;
    }
}