import * as React from "react";
import { connect } from 'react-redux';
import { getOrders } from './adminActions'
import { IOrder, IStoreState } from "../store/configureStore";
import { OrderItem } from "./orderItem";


interface MyProps {
    orders: IOrder[];
    getOrders: () => void;
}

class Order extends React.Component<MyProps, {}> {

    componentDidMount() {
        this.props.getOrders();
    }

    render() {
        let orders = this.props.orders.map(item => {
            return (
                <OrderItem order={item} key={item.id}  />
            );
        });

        return (
            <ul className="list-group">
                {orders}
            </ul>
        );
    }
};

let mapProps = (state: IStoreState) => {
    return {
        orders: state.admin.orders
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    getOrders: () => dispatch(getOrders())
});


export default connect(mapProps, mapDispatchToProps)(Order) 