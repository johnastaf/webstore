import { IPhone, IOrder } from "../store/configureStore";
import { Action, Reducer } from 'redux';
import { SELECT_PHONE, GET_ORDERS_SUCCESS } from '../store/constants'

const initialState: IAdminState = {
    selectedPhone: null,
    orders: []
}

export interface IAdminState {
    selectedPhone: IPhone;
    orders: IOrder[]
}

export const admin: Reducer<IAdminState> = (state: IAdminState = initialState, action: any) => {
    switch (action.type) {
        case SELECT_PHONE:
            return { ...state, selectedPhone: action.selectedPhone }

        case GET_ORDERS_SUCCESS:
            return { ...state, orders: action.orders }

        default:
            return state;
    }
}