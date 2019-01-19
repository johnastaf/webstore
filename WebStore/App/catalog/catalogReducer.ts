import { ADD_PHONE_TO_CART, GET_PHONES_SUCCESS, SEARCH_PHONES } from '../store/constants'
import { Reducer } from 'redux';
import { IPhone } from "../store/configureStore";

const initialState: ICatalogState = {
    phones: []
}

export interface ICatalogState {
    phones: IPhone[];
}


export const catalog: Reducer<ICatalogState> = (state: ICatalogState = initialState, action: any) => {
    switch (action.type) {
        case GET_PHONES_SUCCESS:
            return { ...state, phones: action.phones }

        case SEARCH_PHONES:
            return { ...state, phones: state.phones.filter(p => p.name.toLocaleLowerCase().includes(action.query))}

        default:
            return state;
    }
}