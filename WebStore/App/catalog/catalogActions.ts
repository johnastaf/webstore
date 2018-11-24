import { GET_PHONES_SUCCESS, GET_PHONES_ERROR, SEARCH_PHONES } from '../store/constants'
import "isomorphic-fetch"
import { Dispatch } from 'redux';
import { IStoreState, IPhone } from "../store/configureStore";
import { fetch } from 'domain-task';

export function receivePhones(data: any) {
    return {
        type: GET_PHONES_SUCCESS,
        phones: data
    }
}

export function searchPhones(query: string) {
    return {
        type: SEARCH_PHONES,
        query: query
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
            dispatch(receivePhones(data))
        }).catch((ex) => {
            dispatch(errorReceive(ex))
        });
};
