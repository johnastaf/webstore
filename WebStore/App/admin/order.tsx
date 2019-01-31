import * as React from "react";
import { connect } from 'react-redux';
import { getOrders } from './adminActions'
import { IOrder, IStoreState, IUser } from "../store/configureStore";
import { OrderItem } from "./orderItem";
import { Redirect } from "react-router";


interface MyProps {
    orders: IOrder[];
    getOrders: () => void;
    user: IUser;
}

class Order extends React.Component<MyProps, {}> {

    componentDidMount() {
        this.props.getOrders();
    }

    render() {
        let orders = this.props.orders.map(item => {
            return (
                <OrderItem order={item} key={item.id} />
            );
        });

        return (
            this.props.user.isLogged === true
                ? <ul className="list-group">
                    {orders}
                </ul>
                : <Redirect to={{ pathname: '/user' }} />
        );
    }
};

let mapProps = (state: IStoreState) => {
    return {
        orders: state.admin.orders,
        user: state.user.user
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    getOrders: () => dispatch(getOrders())
});


export default connect(mapProps, mapDispatchToProps)(Order) 