import * as React from "react";
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { createPhone } from './adminActions'
import { Dispatch, Action } from 'redux';
import { IPhone, IPhoneInCart, IStoreState } from "../store/configureStore";
import { CreatePhone } from "./createPhone";


interface MyProps {
    phones: IPhone[];
    createPhone: (name: string, price: number) => void;
}

class Admin extends React.Component<MyProps, {}> {
    render() {
        return (
            <div>
                <CreatePhone createPhone={this.props.createPhone}/>
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
    }
});


export default connect(mapProps, mapDispatchToProps)(Admin) 