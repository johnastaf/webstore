﻿import { ADD_PHONE_TO_CART, REMOVE_PHONE_FROM_CART, CLEAN_CART } from '../store/constants'
import { IPhoneInCart, IOrder } from "../store/configureStore";
import { toastr } from 'react-redux-toastr'

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

export function cleanCart() {
    return {
        type: CLEAN_CART
    }
}

export const createOrder = (order: IOrder) => (dispatch: any) => {
    console.log("ORDER:" + JSON.stringify(order));

    fetch('/api/Order/CreateOrder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(order)
    }).then((response: any) => {
        return response.json()
    }).then((data: any) => {
        console.log(">>> order crated");
    }).catch((ex) => {
        toastr.error('WebStore', ex);
    });
};