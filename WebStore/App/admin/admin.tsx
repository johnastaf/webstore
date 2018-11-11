import * as React from "react";
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { createPhone, removePhone } from './adminActions'
import { Dispatch, Action } from 'redux';
import { IPhone, IPhoneInCart, IStoreState } from "../store/configureStore";
import { CreatePhone } from "./createPhone";
import { EditItem } from "./editItem";


interface MyProps {
    phones: IPhone[];
    createPhone: (name: string, price: number) => void;
    removePhone: (id: number) => void;
}

class Admin extends React.Component<MyProps, {}> {
    render() {
        let phones = this.props.phones.map(item => {
            return (
                <EditItem phone={item} key={item.id} removePhone={this.props.removePhone} />
            );
        });

        return (
            <div>
                <CreatePhone createPhone={this.props.createPhone} />
                {phones}
            </div>
        );
    }
};

let mapProps = (state: IStoreState) => {
    return {
        phones: state.catalog.phones,
        error: state.catalog.error
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    createPhone: (name: string, price: number) => {
        dispatch(createPhone(name, price));
    },
    removePhone: (id: number) => {
        dispatch(removePhone(id));
    }
});


export default connect(mapProps, mapDispatchToProps)(Admin) 