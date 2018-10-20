import { URL } from "url";

export interface IStoreState {
    phones: IPhone[];
    cart: IPhoneInCart[];
    error: string;
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