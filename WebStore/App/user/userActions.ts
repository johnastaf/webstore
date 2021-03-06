﻿import { USER_AUTORIZED, USER_LOGOUT } from '../store/constants'
import { IUser } from '../store/configureStore';
import { toastr } from 'react-redux-toastr';
import { receiveOrders } from '../admin/adminActions';

export function userAutorized(user: IUser) {
    return {
        type: USER_AUTORIZED,
        user: user
    }
}

export function userLogout() {
    return {
        type: USER_LOGOUT
    }
}

let handleError = (response: any): Promise<any> => {
    if (!response.ok) {
        return response.json().then(function (text: any) {
            toastr.error('WebStore', text);

            return Promise.reject(text);
        });
    } else return response.json();
}

export const userLogin = (email: string, password: string) => (dispatch: any) => {
    fetch('api/User/Token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ "email": email, "password": password })
    }).then((response: any) => handleError(response)
    ).then((data: any) => {
        if (data != null && data.access_token != null) {

            console.log("USER: " + JSON.stringify(data));
            sessionStorage.setItem("accessToken", data.access_token);

            let user: IUser = {
                isLogged: true,
                name: data.username,
                email: data.email,
                role: data.role
            }

            dispatch(userAutorized(user));
        }
    }).catch((ex) => {
        console.log(ex);
    });
};

export const validateToken = (token: string) => (dispatch: any) => {
    fetch('api/User/ValidateToken', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ "token": token })
    }).then((response: any) => handleError(response)
    ).then((data: any) => {
        if (data != null) {

            console.log("TOKEN VALID: " + JSON.stringify(data));

            let user: IUser = {
                isLogged: true,
                name: data.username,
                email: data.email,
                role: data.role
            }

            dispatch(userAutorized(user));
        }
    }).catch((ex) => {
        console.log(ex);
    });
};

export const userRegister = (name: string, email: string, password: string, externalId?: string) => (dispatch: any) => {
    fetch('api/User/Register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ "name": name, "email": email, "password": password, "externalId": externalId })
    }).then((response: any) => handleError(response)
    ).then((data: any) => {
        if (data != null && data.access_token != null) {

            console.log("USER CREATED: " + JSON.stringify(data));
            sessionStorage.setItem("accessToken", data.access_token);

            let user: IUser = {
                isLogged: true,
                name: data.username,
                email: data.email,
                role: data.role
            }

            dispatch(userAutorized(user));
        }
    }).catch((ex) => {
        console.log(ex);
    });
};

export const getUserOrders = (email: string) => (dispatch: any) => {
    fetch('/api/Order/GetUserOrders/' + email, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
        },
    }).then((response: any) => {
        return response.json()
    }).then((data: any) => {
        dispatch(receiveOrders(data))
    }).catch((ex) => {
        toastr.error('WebStore', ex);
    });
};
