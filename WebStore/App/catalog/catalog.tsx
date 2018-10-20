import * as React from "react";
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getPhones, addPhoneToCart } from './catalogActions'
import { Dispatch, Action } from 'redux';
import { IStoreState, IPhone, IPhoneInCart } from "../store/configureStore";
import { Item } from "./item";
import { ADD_PHONE_TO_CART } from './catalogConstants'


interface MyProps {
    phones: IPhone[];
    getPhones: () => void;
    addPhoneToCart: (phone: IPhone) => void;
}

class Catalog extends React.Component<MyProps, {}> {

    componentDidMount() {
        this.props.getPhones();
    }

    render() {
        let phones = this.props.phones.map(item => {
            return (
                <Item phone={item} key={item.name} addPhoneToCart={this.props.addPhoneToCart}/>
            );
        });

        return (
            <div className="container">
                {phones}
            </div>
        );
    }
};

let mapProps = (state: IStoreState) => {
    return {
        phones: state.phones,
        error: state.error
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    getPhones: () => dispatch(getPhones()),
    addPhoneToCart: (phone: IPhone) => {
        let phoneToCart: IPhoneInCart = { phone: phone, quantity: 1 };
        dispatch(addPhoneToCart(phoneToCart));
    }
});


export default connect(mapProps, mapDispatchToProps)(Catalog) 