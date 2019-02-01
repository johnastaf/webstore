import * as React from "react";
import { IPhoneInCart, IOrder } from "../store/configureStore";
import '../style/app.css'

interface MyProps {
    items: IPhoneInCart[];
    createOrder: (order: IOrder) => void;
    cleanCart: () => void;
}

export class CreateOrder extends React.Component<MyProps, {}> {
    public refs: {
        nameOrder: HTMLInputElement;
        addressOrder: HTMLInputElement;
    };

    createOrder = () => {
        this.refs.nameOrder.classList.remove('required-field');
        this.refs.addressOrder.classList.remove('required-field');

        if (this.refs.nameOrder.value == '') {
            this.refs.nameOrder.classList.add('required-field');
        } else if (this.refs.addressOrder.value == '') {
            this.refs.addressOrder.classList.add('required-field');
        } else {
            let order: IOrder = {
                id: 0,
                date: new Date(),
                name: this.refs.nameOrder.value,
                address: this.refs.addressOrder.value,
                email: '',
                items: this.props.items.map((it) => {
                    return { ...it, price: it.phone.price };
                })
            }

             this.props.createOrder(order);
             this.props.cleanCart();
        }
    }

    render() {
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="nameOrder">Name</label>
                    <input type="text" className="form-control" ref="nameOrder" placeholder="Enter name" />
                </div>
                <div className="form-group">
                    <label htmlFor="addressOrder">Address</label>
                    <input type="text" className="form-control" ref="addressOrder" placeholder="Enter address" />
                </div>
                <button className="btn btn-primary" onClick={this.createOrder}>
                    Create order
                 </button>
            </div>
        );
    }
};

