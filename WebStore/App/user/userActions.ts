﻿import { USER_AUTORIZED, USER_LOGOUT } from '../store/constants'
import { IUser } from '../store/configureStore';
import { toastr } from 'react-redux-toastr';

export function userAutorized(user: IUser) {
    return {
        type: USER_AUTORIZED,
        user: user
    }
}

export function userLogout(user: IUser) {
    return {
        type: USER_LOGOUT
    }
}

export const userLogin = (email: string, password: string) => (dispatch: any) => {
    fetch('api/User/Token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ "email": email, "password": password })
    }).then((response: any) => {
        if (response.status === 400) {
            toastr.error('WebStore', 'Wrong email or password.');
        } else {
            return response.json();
        }
    }).then((data: any) => {
        let jsonData: any = JSON.parse(data);

        if (jsonData != null && jsonData.access_token != null) {

            let user: IUser = {
                isLogged: true,
                name: jsonData.username,
                id: "test_id"
            }

            dispatch(userAutorized(user));
        }
    }).catch((ex) => {
        console.log(ex);
    });
};