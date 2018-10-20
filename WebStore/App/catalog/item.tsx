import * as React from "react";
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getPhones } from './catalogActions'
import { Dispatch, Action } from 'redux';
import { IStoreState, IPhone } from "../store/configureStore";


interface MyProps {
    phone: IPhone;
}

export class Item extends React.Component<MyProps, {}> {
    render() {
        return (
            <div key={this.props.phone.name} className="row">
                {this.props.phone.name}
                {this.props.phone.price}
                <button type="button" className="btn">Buy</button>
            </div>
        );
    }
};

