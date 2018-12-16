import { URL } from "url";
import { ICatalogState } from "../catalog/catalogReducer";
import { ICartState } from "../cart/cartReducer";
import { IAdminState } from "../admin/adminReducer";

export interface IStoreState {
    catalog: ICatalogState;
    cart: ICartState;
    admin: IAdminState;
};

export interface IPhone {
    id: number;
    name: string;
    price: number;
    image: string;
}

export interface IPhoneInCart {
    phone: IPhone;
    quantity: number;
}

export interface IPhoneInOrder extends IPhoneInCart{
    price: number;
}

export interface IOrder {
    id: number;
    date: Date;
    name: string;
    address: string;
    items: IPhoneInOrder[];
}

