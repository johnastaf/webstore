import { IPhone } from "../store/configureStore";
import { Action, Reducer } from 'redux';
import { SELECT_PHONE } from './adminConstants'

const initialState: IAdminState = {
    selectedPhone: null
}

export interface IAdminState {
    selectedPhone: IPhone;

}

export const admin: Reducer<IAdminState> = (state: IAdminState = initialState, action: any) => {
    switch (action.type) {
        case SELECT_PHONE:
            console.log("---selected: " + action.selectedPhone);

            return { ...state, selectedPhone: action.selectedPhone }


        default:
            return state;
    }
}