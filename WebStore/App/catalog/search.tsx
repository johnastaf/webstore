import * as React from "react";
import { connect } from 'react-redux';
import { addPhoneToCart } from '../cart/cartActions'
import { IPhone, IPhoneInCart, IStoreState } from "../store/configureStore";
import { CatalogItem } from "./catalogItem";

interface MyProps {
    phones: IPhone[];
    query: string;
    addPhoneToCart: (phone: IPhone) => void;
}

class Search extends React.Component<MyProps, {}> {

    render() {
        let phones = this.props.phones.filter(p => p.show == true && p.name.toLocaleLowerCase().includes(this.props.query)).map(item => {
            return (
                <CatalogItem phone={item} key={item.id} addPhoneToCart={this.props.addPhoneToCart} />
            );
        });

        return (
            <div>
                Search result: {phones.length}
                <div className="row" style={{ marginTop: '20px' }}>
                    {phones}
                </div>
            </div>
        );
    }
};

let mapProps = (state: IStoreState) => {
    return {
        phones: state.catalog.phones,
        query: state.catalog.query
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    addPhoneToCart: (phone: IPhone) => {
        let phoneToCart: IPhoneInCart = { phone: phone, quantity: 1 };
        dispatch(addPhoneToCart(phoneToCart));
    }
});


export default connect(mapProps, mapDispatchToProps)(Search) 