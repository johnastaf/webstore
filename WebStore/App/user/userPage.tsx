import * as React from "react";
import { connect } from 'react-redux';
import { getUserOrders } from './userActions'
import { IOrder, IStoreState, IUser } from "../store/configureStore";
import { OrderItem } from "../admin/orderItem";
import { Redirect } from "react-router";


interface MyProps {
    orders: IOrder[];
    getUserOrders: (email: string) => void;
    user: IUser;
}

class UserPage extends React.Component<MyProps, {}> {

    componentDidMount() {
        this.props.getUserOrders(this.props.user.email);
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
                : <Redirect to={{ pathname: '/login' }} />
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
    getUserOrders: (email: string) => dispatch(getUserOrders(email))
});


export default connect(mapProps, mapDispatchToProps)(UserPage) 