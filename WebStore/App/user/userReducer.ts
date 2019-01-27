import { USER_AUTORIZED } from '../store/constants'
import { Reducer } from 'redux';
import { IUser } from "../store/configureStore";

const initialState: IUserState = {
    user: {
        isLogged: false,
        name: '',
        id: ''
    }
}

export interface IUserState {
    user: IUser;
}


export const user: Reducer<IUserState> = (state: IUserState = initialState, action: any) => {
    switch (action.type) {
        case USER_AUTORIZED:
            console.log("USER_AUTORIZED: " + JSON.stringify(action.user));

            return { ...state, user: action.user }


        default:
            return state;
    }
}