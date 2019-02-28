import { GET_PHONES_SUCCESS, SEARCH_PHONES } from '../store/constants'
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

let handleError = (response: any): Promise<any> => {
    if (!response.ok) {
        return response.json().then(function (text: any) {
            toastr.error('WebStore', text);

            return Promise.reject(text);
        });
    } else return response.json();
}

export const getPhones = () => (dispatch: any) => {
    fetch('/api/Phones/GetPhones')
        .then((response: any) => handleError(response)
        ).then((data: any) => {
            dispatch(receivePhones(data))
        }).catch((ex) => {
            toastr.error('WebStore', ex);
        });
};
