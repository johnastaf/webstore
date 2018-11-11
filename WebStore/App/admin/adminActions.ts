import { CREATE_PHONE } from './adminConstants'
import "isomorphic-fetch"
import { Dispatch } from 'redux';
import { IStoreState, IPhone } from "../store/configureStore";
import { fetch } from 'domain-task';
import { getPhones } from '../catalog/catalogActions'

export const createPhone = (name: string, price: number) => (dispatch: any) => {
    console.log(name + " ---   " + price);
    fetch('/api/Phones/CreatePhone', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ "name": name, "price": price, "image": null })
    }).then((response: any) => {
        return response.json()
    }).then((data: any) => {
        console.log(">>> suc " + data);
        dispatch(getPhones());
    }).catch((ex) => {
        console.log(">>> err " + ex);
    });
};


export const removePhone = (id: number) => (dispatch: any) => {
    fetch('/api/Phones/RemovePhone/' + id)
        .then((response: any) => {
            return response.json()
        }).then((data: any) => {
            console.log(">>> suc " + data);
            dispatch(getPhones());
        }).catch((ex) => {
            console.log(">>> err " + ex);
        });
};