import * as React from "react";
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getPhones } from './catalogActions'
import { Dispatch, Action } from 'redux';
import IStoreState from "../store/configureStore";

interface MyProps {
    phones: string[];
    getPhones: () => void;
}

class Catalog extends React.Component<MyProps, {}> {

    componentDidMount() {
        this.props.getPhones();
    }

    render() {
        let phones = this.props.phones.map(item => {
            return (
                <div className="container" key={item}>
                    {item}
                    <button type="button" className="btn">Buy</button>
                </div>
            );
        });

        return (
            <div id="phones">
                {phones}
            </div>
        );
    }
};

let mapProps = (state: IStoreState) => {
    return {
        phones: state.phones,
        error: state.error
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    getPhones: () => dispatch(getPhones())
});


export default connect(mapProps, mapDispatchToProps)(Catalog) 