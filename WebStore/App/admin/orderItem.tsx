import * as React from "react";
import { IOrder } from "../store/configureStore";


interface MyProps {
    order: IOrder;
}

export class OrderItem extends React.Component<MyProps, {}> {
    render() {
        let phonesInOrder = this.props.order.items.map(item => {
            return (
                <div className="list-group-item" key={item.phone.id}>
                    Model: {item.phone.name} Price: {item.price} Quantity: {item.quantity}
                </div>
            );
        });

        let getDate = (today: Date): string => {
            let date: Date = new Date(today);

            return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        }

        return (
            <div>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <a data-toggle="collapse" href={'#collapse' + this.props.order.id}>
                        Date: {getDate(this.props.order.date)} Name: {this.props.order.name} Address: {this.props.order.address}
                    </a>
                    <span className="badge badge-primary badge-pill">{this.props.order.items.length}</span>

                </li>
                <div className="panel-collapse collapse" id={'collapse' + this.props.order.id}>
                    <div className="panel-body">
                        {phonesInOrder}
                    </div>
                </div>
            </div>
        );
    }
};

