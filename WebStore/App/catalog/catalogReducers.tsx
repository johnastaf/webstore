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
            return { ...state, phones: action.phones, error: ''}

        case ADD_PHONE_TO_CART:
            return { ...state, cart: action.cart, error: '' }

        case GET_PHONES_ERROR:
            return { ...state, error: action.error }

        default:
            return state;
    }
}