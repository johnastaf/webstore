import { CREATE_PHONE } from './adminConstants'
import "isomorphic-fetch"
import { Dispatch } from 'redux';
import { IStoreState, IPhone } from "../store/configureStore";
import { fetch } from 'domain-task';

export const createPhone = (name: string, price: number) => (dispatch: any) => {
    fetch('/api/Phones/CreatePhone', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ "name": name, "price": price, "image": null })
    }).then((response: any) => {
        return response.json()
    });
};