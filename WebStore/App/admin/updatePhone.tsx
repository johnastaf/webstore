import * as React from "react";
import { IPhone } from "../store/configureStore";


interface MyProps {
    selectedItem: IPhone;
    updatePhone: (id: number, name: string, price: number) => void;
}

export class UpdatePhone extends React.Component<MyProps, {}> {
    public refs: {
        phoneName: HTMLInputElement;
        phonePrice: HTMLInputElement;
    };

    shouldComponentUpdate(nextProps: MyProps, nextState: MyProps): boolean {
        this.refs.phoneName.value = nextProps.selectedItem.name;
        this.refs.phonePrice.value = "" + nextProps.selectedItem.price;

        return true;
    }

    componentDidMount() {
        this.refs.phoneName.value = this.props.selectedItem.name;
        this.refs.phonePrice.value = "" + this.props.selectedItem.price;
    }

    clickUpdate = () => {
        this.props.updatePhone(this.props.selectedItem.id, this.refs.phoneName.value, +this.refs.phonePrice.value);
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
                <button style={{ marginLeft: '10px' }} type="button" className="btn btn-info"
                    onClick={this.clickUpdate}>
                    Update
                 </button>
            </div>
        );
    }
};

