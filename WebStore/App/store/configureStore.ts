import { URL } from "url";

export interface IStoreState {
    phones: IPhone[];
    error: string;
};


export interface IPhone {
    name: string;
    price: number;
    image: string;
}