import { ADD_PHONE_TO_CART, REMOVE_PHONE_FROM_CART } from '../cart/cartConstants'
import { IPhoneInCart } from "../store/configureStore";

export function addPhoneToCart(phoneInCart: IPhoneInCart) {
    return {
        type: ADD_PHONE_TO_CART,
        addedPhone: phoneInCart
    }
}

export function removePhoneFromCart(phoneInCart: IPhoneInCart) {
    return {
        type: REMOVE_PHONE_FROM_CART,
        removedPhone: phoneInCart
    }
}