import { GET_PHONES_SUCCESS, GET_PHONES_ERROR } from './catalogConstants'
import IStoreState from "../store/configureStore";

const initialState: IStoreState = {
    phones: ["iPhone 7 Plus", "Samsung Galaxy A5"],
    error: ''
}

export default function catalog(state = initialState, action: any) {
    switch (action.type) {
        case GET_PHONES_SUCCESS:
            return { ...state, phones: action.phones, error: '' }

        case GET_PHONES_ERROR:
            return { ...state, error: action.error }

        default:
            return state;
    }
}