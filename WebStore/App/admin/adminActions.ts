import { CREATE_PHONE, GET_ORDERS_SUCCESS, SELECT_PHONE } from '../store/constants'
import "isomorphic-fetch"
import { IPhone } from "../store/configureStore";
import { fetch } from 'domain-task';
import { getPhones } from '../catalog/catalogActions'
import { toastr } from 'react-redux-toastr'

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
            dispatch(receiveOrders(data))
        }).catch((ex) => {
            toastr.error('WebStore', ex);
        });
};

export const createPhone = (name: string, price: number) => (dispatch: any) => {
    fetch('/api/Phones/CreatePhone', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ "name": name, "price": price, "image": null, show: false })
    }).then((response: any) => {
        return response.json()
    }).then((data: any) => {
        // TODO : change to get from reducer
        dispatch(getPhones());
    }).catch((ex) => {
        toastr.error('WebStore', ex);
    });
};


export const removePhone = (id: number) => (dispatch: any) => {
    fetch('/api/Phones/RemovePhone/' + id)
        .then((response: any) => {
            return response.json()
        }).then((data: any) => {
            if (data.statusCode == 200) {
                dispatch(selectPhone(null));
                // TODO : change to get from reducer
                dispatch(getPhones());
            } else toastr.error('WebStore', 'Can not remove this product. It is used.');
        }).catch((ex) => {
            toastr.error('WebStore', ex);
        });
};

export const updatePhone = (id: number, name: string, price: number) => (dispatch: any) => {
    fetch('/api/Phones/UpdatePhone', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ "id": id, "name": name, "price": price, "image": null })
    }).then((response: any) => {
        return response.json()
        }).then((data: any) => {
        //TODO: update phone in store, not need get phones from server again
        dispatch(selectPhone(null));
        dispatch(getPhones());
    }).catch((ex) => {
        toastr.error('WebStore', ex);
    });
};

export const showPhone = (id: number) => (dispatch: any) => {
    fetch('/api/Phones/ShowPhone/' + id)
        .then((response: any) => {
            return response.json()
        }).catch((ex) => {
            toastr.error('WebStore', ex);
        });
};