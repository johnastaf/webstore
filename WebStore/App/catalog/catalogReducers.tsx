import { GET_PHONES_SUCCESS, GET_PHONES_ERROR, ADD_PHONE_TO_CART } from './catalogConstants'
import { IStoreState, IPhoneInCart } from "../store/configureStore";

const initialState: IStoreState = {
    phones: [],
    cart: [],
    error: ''
}

export default function catalog(state = initialState, action: any) {
    switch (action.type) {
        case GET_PHONES_SUCCESS:
            return { ...state, phones: action.phones, error: '' }

        case ADD_PHONE_TO_CART:
            if (state !== undefined && state != null
                && state.cart !== undefined && state.cart !== null && state.cart.length > 0) {
                let index: any = state.cart.findIndex(p => p.phone.name === action.addedPhone.phone.name);

                if (index > -1) {
                    state.cart[index].quantity = state.cart[index].quantity + 1;

                    return state;
                }
            }

            return { ...state, cart: [...state.cart, action.addedPhone], error: '' }

        case GET_PHONES_ERROR:
            return { ...state, error: action.error }

        default:
            return state;
    }
}