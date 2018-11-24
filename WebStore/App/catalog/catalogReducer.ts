﻿import { ADD_PHONE_TO_CART, GET_PHONES_SUCCESS, GET_PHONES_ERROR, SEARCH_PHONES } from '../store/constants'
import { Action, Reducer } from 'redux';
import { IPhone } from "../store/configureStore";

const initialState: ICatalogState = {
    phones: [],
    error: ''
}

export interface ICatalogState {
    phones: IPhone[];
    error: string;
}


export const catalog: Reducer<ICatalogState> = (state: ICatalogState = initialState, action: any) => {
    switch (action.type) {
        case GET_PHONES_SUCCESS:
            return { ...state, phones: action.phones, error: '' }

        case SEARCH_PHONES:
            return { ...state, phones: state.phones.filter(p => p.name.toLocaleLowerCase().includes(action.query))}

        case GET_PHONES_ERROR:
            alert('ERROR: ' + action.error);
            return { ...state, error: action.error }

        default:
            return state;
    }
}