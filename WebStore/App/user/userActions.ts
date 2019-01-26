import { USER_AUTORIZED, USER_LOGOUT } from '../store/constants'
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
        console.log(JSON.stringify(response));
        return response.json()
        }).then((data: any) => {
            console.log(JSON.stringify(data));
        if (data.statusCode == 400) {
            toastr.error('WebStore', 'Wrong email or password.');
        } 
    }).catch((ex) => {
        console.log(ex);
    });
};