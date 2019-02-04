import { USER_AUTORIZED, USER_LOGOUT } from '../store/constants'
import { Reducer } from 'redux';
import { IUser } from "../store/configureStore";

const initialState: IUserState = {
    user: {
        isLogged: false,
        name: '',
        email: '',
        role: ''
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

        case USER_LOGOUT:
            console.log("USER_LOGOUT");

            sessionStorage.removeItem("accessToken");

            return { ...state, user: initialState };

        default:
            return state;
    }
}