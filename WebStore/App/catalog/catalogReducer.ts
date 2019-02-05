import { GET_PHONES_SUCCESS, SEARCH_PHONES } from '../store/constants'
import { Reducer } from 'redux';
import { IPhone } from "../store/configureStore";

const initialState: ICatalogState = {
    phones: [],
    query: ''
}

export interface ICatalogState {
    phones: IPhone[];
    query: string;
}


export const catalog: Reducer<ICatalogState> = (state: ICatalogState = initialState, action: any) => {
    switch (action.type) {
        case GET_PHONES_SUCCESS:
            return { ...state, phones: action.phones }

        case SEARCH_PHONES:
            return { ...state, query: action.query }

        default:
            return state;
    }
}