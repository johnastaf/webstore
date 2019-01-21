import * as React from "react";
import { connect } from 'react-redux';
import { addPhoneToCart } from '../cart/cartActions'
import { IPhone, IPhoneInCart, IStoreState } from "../store/configureStore";
import { CatalogItem } from "./catalogItem";

interface MyProps {
    phones: IPhone[];
    addPhoneToCart: (phone: IPhone) => void;
}

class Catalog extends React.Component<MyProps, {}> {

    render() {
        let phones = this.props.phones.filter(p => p.show == true).map(item => {
            return (
                <CatalogItem phone={item} key={item.id} addPhoneToCart={this.props.addPhoneToCart}/>
            );
        });

        return (
            <div className="row">
                {phones}
            </div>
        );
    }
};

let mapProps = (state: IStoreState) => {
    return {
        phones: state.catalog.phones
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    addPhoneToCart: (phone: IPhone) => {
        let phoneToCart: IPhoneInCart = { phone: phone, quantity: 1 };
        dispatch(addPhoneToCart(phoneToCart));
    }
});


export default connect(mapProps, mapDispatchToProps)(Catalog) 