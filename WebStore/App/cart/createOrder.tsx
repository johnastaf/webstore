import * as React from "react";
import { IPhoneInCart, IOrder } from "../store/configureStore";


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
        var today = new Date();

        let order: IOrder = {
            id: 0,
            date: today,
            total: 0,
            name: this.refs.nameOrder.value,
            address: this.refs.addressOrder.value,
            items: this.props.items.map((it) => {
                return { ...it, price: it.phone.price };
            })
        }

        this.props.createOrder(order);

        this.props.cleanCart();
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

