import * as React from "react";
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { createPhone } from './adminActions'
import { Dispatch, Action } from 'redux';
import { IPhone, IPhoneInCart, IStoreState } from "../store/configureStore";


interface MyProps {
    phones: IPhone[];
    createPhone: (phone: IPhone) => void;
}

class Admin extends React.Component<MyProps, {}> {
    render() {
        return (
            <div>
                Admin panel
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
    createPhone: (phone: IPhone) => {
        dispatch(createPhone(phone));
    }
});


export default connect(mapProps, mapDispatchToProps)(Admin) 