import * as React from "react";
import { connect } from 'react-redux';
import { createPhone, removePhone, selectPhone, updatePhone, showPhone } from './adminActions'
import { IPhone, IStoreState } from "../store/configureStore";
import { CreatePhone } from "./createPhone";
import { UpdatePhone } from "./updatePhone";
import { EditItem } from "./editItem";


interface MyProps {
    phones: IPhone[];
    selectedItem: IPhone;
    createPhone: (name: string, price: number) => void;
    removePhone: (id: number) => void;
    selectPhone: (phone: IPhone) => void;
    updatePhone: (id: number, name: string, price: number) => void;
    showPhone: (id: number) => void;
}

class Admin extends React.Component<MyProps, {}> {
    componentWillUnmount() {
        this.props.selectPhone(null);
    }

    render() {
        let phones = this.props.phones.map(item => {
            return (
                <EditItem phone={item} key={item.id} selectedItem={this.props.selectedItem}
                    removePhone={this.props.removePhone} selectPhone={this.props.selectPhone} showPhone={this.props.showPhone} />
            );
        });

        return (
            <div>
                <CreatePhone createPhone={this.props.createPhone} />
                {this.props.selectedItem != null && <UpdatePhone updatePhone={this.props.updatePhone} selectedItem={this.props.selectedItem} />}
                <ul  className="list-group">
                    {phones}
                </ul >
            </div>
        );
    }
};

let mapProps = (state: IStoreState) => {
    return {
        phones: state.catalog.phones,
        selectedItem: state.admin.selectedPhone
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    createPhone: (name: string, price: number) => {
        dispatch(createPhone(name, price));
    },
    removePhone: (id: number) => {
        dispatch(removePhone(id));
    },
    selectPhone: (phone: IPhone) => {
        dispatch(selectPhone(phone));
    },
    updatePhone: (id: number, name: string, price: number) => {
        dispatch(updatePhone(id, name, price));
    },
    showPhone: (id: number) => {
        dispatch(showPhone(id));
    },
});


export default connect(mapProps, mapDispatchToProps)(Admin) 