import { ICatalogState } from "../catalog/catalogReducer";
import { ICartState } from "../cart/cartReducer";
import { IAdminState } from "../admin/adminReducer";
import { IUserState } from "../user/userReducer";

export interface IStoreState {
    catalog: ICatalogState;
    cart: ICartState;
    admin: IAdminState;
    user: IUserState;
};

export interface IPhone {
    id: number;
    name: string;
    price: number;
    image: string;
    show: boolean;
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

export interface IUser {
    isLogged: boolean;
    name: string;
    id: string;
}

