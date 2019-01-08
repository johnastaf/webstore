import * as React from "react";
import { IPhone } from "../store/configureStore";


interface MyProps {
    phone: IPhone;
    selectedItem: IPhone;
    removePhone: (id: number) => void;
    selectPhone: (phone: IPhone) => void;
    showPhone: (id: number) => void;
}

export class EditItem extends React.Component<MyProps, {}> {
    shouldComponentUpdate(nextProps: MyProps, nextState: MyProps): boolean {

        if (nextProps.selectedItem != null && nextProps.selectedItem.id == this.props.phone.id) {
            this.refs.phoneItem.classList.add('active');
        } else {
            this.refs.phoneItem.classList.remove('active');
        }

        return true;
    }

    public refs: {
        phoneItem: HTMLInputElement;
    };

    clickOnItem = () => {
        this.props.selectPhone(this.props.phone);
        this.refs.phoneItem.classList.add('active');
    }

    handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.showPhone(this.props.phone.id);
    }

    render() {
        return (
            <li ref="phoneItem" className="list-group-item" onClick={this.clickOnItem}>
                <div className="row">
                    <div>{this.props.phone.name}</div>
                    <div style={{ marginLeft: '10px' }}>Price: {this.props.phone.price}</div>
                    <button style={{ marginLeft: '15px' }} type="button" className="btn btn-danger"
                        onClick={() => { this.props.removePhone(this.props.phone.id) }}>
                        Remove from db
                    </button>
                    <div style={{ marginLeft: '15px' }}>
                        <input type="checkbox" defaultChecked={this.props.phone.show} onChange={this.handleOnChange} />
                        <label>Show in catalog</label>
                    </div>
                </div>
            </li >
        );
    }
};

