import * as React from "react";
import { IPhone } from "../store/configureStore";


interface MyProps {
    createPhone: (name: string, price: number) => void;
}

export class CreatePhone extends React.Component<MyProps, {}> {
    public refs: {
        phoneName: HTMLInputElement;
        phonePrice: HTMLInputElement;
    };

    clickCreate = () => {
        this.props.createPhone(this.refs.phoneName.value, +this.refs.phonePrice.value);
        this.refs.phoneName.value = "";
        this.refs.phonePrice.value = "";
    }

    render() {
        return (
            <div className="row" style={{ marginBottom: '10px' }}>
                <div style={{ marginLeft: '20px' }}>
                    Name: <input type="input" ref="phoneName" />
                </div>
                <div style={{ marginLeft: '10px' }}>
                    Price: <input type="input" ref="phonePrice" />
                </div>
                <button style={{ marginLeft: '10px' }} type="button" className="btn btn-success"
                    onClick={this.clickCreate}>
                    Create
                 </button>
            </div>
        );
    }
};

