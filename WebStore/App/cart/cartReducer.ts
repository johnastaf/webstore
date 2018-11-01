import { ADD_PHONE_TO_CART, REMOVE_PHONE_FROM_CART } from '../cart/cartConstants'
import { IPhoneInCart } from "../store/configureStore";
import { Action, Reducer } from 'redux';

let index: number;
let countPhonesInCart: number;
const reducer = (accumulator: number, currentValue: IPhoneInCart) => accumulator + currentValue.quantity;

const initialState: ICartState = {
    cart: [],
    totalCount: 0
}

export interface ICartState {
    cart: IPhoneInCart[];
    totalCount: number;
}

export const cart: Reducer<ICartState> = (state: ICartState = initialState, action: any) => {
    switch (action.type) {
        case ADD_PHONE_TO_CART:
            countPhonesInCart = state.cart.reduce(reducer, 1);

            index = state.cart.findIndex(p => p.phone.name === action.addedPhone.phone.name);

            if (index > -1) {
                state.cart[index].quantity = state.cart[index].quantity + 1;

                return { ...state, totalCount: countPhonesInCart };
            }

            return { ...state, cart: [...state.cart, action.addedPhone], totalCount: countPhonesInCart }

        case REMOVE_PHONE_FROM_CART:
            index = state.cart.findIndex(p => p.phone.name === action.removedPhone.phone.name);

            if (index > -1) {
                let newCart: IPhoneInCart[] = [...state.cart.slice(0, index), ...state.cart.slice(index + 1, state.cart.length)];

                countPhonesInCart = newCart.reduce(reducer, 0);

                return { ...state, cart: newCart, totalCount: countPhonesInCart };
            }

            return state;

        default:
            return state;
    }
}