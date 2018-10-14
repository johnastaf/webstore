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
        let posts = this.props.phones.map(item => {
            return (
                    <div>{item}</div>
            );
        });

        return (
            <div id="blog">
                {posts}
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

//let mapDispatch = (dispatch: Dispatch<IStoreState>) => {
//    return {
//        getPhones: () => dispatch(getPhones())
//    }
//}

const mapDispatchToProps = (dispatch: any) => ({
    getPhones: () => dispatch(getPhones())
});


export default connect(mapProps, mapDispatchToProps)(Catalog) 