import * as React from "react";
import { IPhone } from "../store/configureStore";


interface MyProps {
    phone: IPhone;
    removePhone: (id: number) => void;
}

export class EditItem extends React.Component<MyProps, {}> {
    render() {
        return (
            <div className="row" style={{ marginBottom: '10px' }}>
                <div>{this.props.phone.name}</div>
                <div style={{ marginLeft: '10px' }}>{this.props.phone.price}</div>
                <button style={{ marginLeft: '10px' }} type="button" className="btn btn-danger"
                    onClick={() => { this.props.removePhone(this.props.phone.id) }}>
                    Remove from db
                 </button>
            </div>
        );
    }
};

