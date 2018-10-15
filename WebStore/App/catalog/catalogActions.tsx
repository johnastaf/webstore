import { GET_PHONES_SUCCESS, GET_PHONES_ERROR } from './catalogConstants'
import "isomorphic-fetch"
import { Dispatch } from 'redux';
import IStoreState from "../store/configureStore";
import { fetch } from 'domain-task';

export function receivePosts(data: any) {
    return {
        type: GET_PHONES_SUCCESS,
        phones: data
    }
}

export function errorReceive(err: any) {
    return {
        type: GET_PHONES_ERROR,
        error: err
    }
}
export const getPhones = () => (dispatch: any) => {
    fetch('/api/Phones/GetPhones')
        .then((response: any) => {
            return response.json()
        }).then((data: any) => {
            dispatch(receivePosts(data))
        }).catch((ex) => {
            dispatch(errorReceive(ex))
        });
};