import * as React from "react";
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getPhones } from './catalogActions'
import { Dispatch, Action } from 'redux';
import { IStoreState, IPhone } from "../store/configureStore";


interface MyProps {
    phone: IPhone;
    addPhoneToCart: (phone: IPhone) => void;
}

export class Item extends React.Component<MyProps, {}> {
    render() {
        return (
            <div className="row" style={{ marginBottom: '10px' }}>
                <div>{this.props.phone.name}</div>
                <div style={{ marginLeft: '10px' }}>{this.props.phone.price}</div>
                <button style={{ marginLeft: '10px' }} type="button" className="btn btn-success" onClick={() => { this.props.addPhoneToCart(this.props.phone) }}>
                    Buy
                    </button>
            </div>
        );
    }
};

