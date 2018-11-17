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
                    Model: {item.phone.name} Price: {item.phone.price} Quantity: {item.quantity}
                </div>
            );
        });

        return (
            <div>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <a data-toggle="collapse" href={'#collapse' + this.props.order.id}>
                        Date: {this.props.order.date} Name: {this.props.order.name} Address: {this.props.order.address}
                    </a>
                    <span className="badge badge-primary badge-pill">{this.props.order.items.length}</span>

                </li>
                <div className="panel-collapse collapse" id={'collapse' + this.props.order.id}>
                    <div className="panel-body">
                        {phonesInOrder}
                    </div>
                </div>
            </div>

            //<div className="panel panel-default">
            //    <a className="list-group-item" data-toggle="collapse" href="#collapseTC001A">
            //        <span className="badge">4</span>
            //        TC001A
            //   </a>
            //    <div className="panel-collapse collapse" id="collapseTC001A">
            //        <div className="panel-body">
            //            <a href="#" className="list-group-item">4</a>
            //            <a href="#" className="list-group-item">3</a>
            //            <a href="#" className="list-group-item">2</a>
            //            <a href="#" className="list-group-item">1</a>
            //        </div>
            //    </div>
            //</div>
        );
    }
};

