import * as React from "react";
import { IPhoneInCart, IOrder } from "../store/configureStore";


interface MyProps {
    items: IPhoneInCart[];
    createOrder: (order: IOrder) => void;
}

export class CreateOrder extends React.Component<MyProps, {}> {
    public refs: {
        nameOrder: HTMLInputElement;
        addressOrder: HTMLInputElement;
    };

    createOrder = () => {
        console.log(" --------- createOrder");
        var today = new Date();

        let order: IOrder = {
            date: today,
            total: 500,
            name: "John",
            address: "NY",
            items: this.props.items
        }

        this.props.createOrder(order);
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

