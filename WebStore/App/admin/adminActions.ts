import { CREATE_PHONE, GET_ORDERS_SUCCESS, SELECT_PHONE } from '../store/constants'
import "isomorphic-fetch"
import { Dispatch } from 'redux';
import { IStoreState, IPhone } from "../store/configureStore";
import { fetch } from 'domain-task';
import { getPhones, errorReceive } from '../catalog/catalogActions'

export function selectPhone(phone: IPhone) {
    return {
        type: SELECT_PHONE,
        selectedPhone: phone
    }
}

export function receiveOrders(data: any) {
    return {
        type: GET_ORDERS_SUCCESS,
        orders: data
    }
}

export const getOrders = () => (dispatch: any) => {
    fetch('/api/Order/GetOrders')
        .then((response: any) => {
            return response.json()
        }).then((data: any) => {
            console.log(">>> suc orders" + data);
            dispatch(receiveOrders(data))
        }).catch((ex) => {
            console.log(">>> err " + ex);
        });
};

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
    }).then((data: any) => {
        console.log(">>> suc " + data);
        // TODO : change to get from reducer
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
            console.log(JSON.stringify(data));
            console.log(">>> suc " + data.statusCode);
            if (data.statusCode == 200) {
                dispatch(selectPhone(null));
                // TODO : change to get from reducer
                dispatch(getPhones());
            } else dispatch(errorReceive("Can not remove this product. It is used."));
        }).catch((ex) => {
            dispatch(errorReceive(ex));
            console.log(">>> err " + ex);
        });
};

export const updatePhone = (id: number, name: string, price: number) => (dispatch: any) => {
    fetch('/api/Phones/UpdatePhone', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ "id" : id, "name": name, "price": price, "image": null })
    }).then((response: any) => {
        return response.json()
    }).then((data: any) => {
        console.log(">>> suc " + data);
        dispatch(selectPhone(null));
        dispatch(getPhones());
    }).catch((ex) => {
        console.log(">>> err " + ex);
    });
};