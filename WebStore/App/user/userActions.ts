import { USER_AUTORIZED, USER_LOGOUT } from '../store/constants'
import { IUser } from '../store/configureStore';

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