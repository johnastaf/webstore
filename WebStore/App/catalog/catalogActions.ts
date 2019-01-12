import { GET_PHONES_SUCCESS, GET_PHONES_ERROR, SEARCH_PHONES } from '../store/constants'
import "isomorphic-fetch"
import { fetch } from 'domain-task';
import { toastr } from 'react-redux-toastr'

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

export const getPhones = () => (dispatch: any) => {
    fetch('/api/Phones/GetPhones')
        .then((response: any) => {
            return response.json()
        }).then((data: any) => {
            dispatch(receivePhones(data))
        }).catch((ex) => {
            toastr.error('WebStore', ex);
        });
};
