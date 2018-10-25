import { URL } from "url";
import { ICatalogState } from "../catalog/catalogReducer";
import { ICartState } from "../cart/cartReducer";

export interface IStoreState {
    catalog: ICatalogState;
    cart: ICartState;
};

export interface IPhone {
    name: string;
    price: number;
    image: string;
}

export interface IPhoneInCart {
    phone: IPhone;
    quantity: number;
}