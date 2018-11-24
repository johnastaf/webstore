﻿import * as React from "react";
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getPhones } from './catalogActions'
import { addPhoneToCart } from '../cart/cartActions'
import { Dispatch, Action } from 'redux';
import { IPhone, IPhoneInCart, IStoreState } from "../store/configureStore";
import { CatalogItem } from "./catalogItem";

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
                <CatalogItem phone={item} key={item.id} addPhoneToCart={this.props.addPhoneToCart}/>
            );
        });

        return (
            <div className="row">
                {phones}
            </div>
        );
    }
};

let mapProps = (state: IStoreState) => {
    return {
        phones: state.catalog.phones
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