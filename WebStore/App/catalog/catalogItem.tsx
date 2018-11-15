import * as React from "react";
import { IPhone } from "../store/configureStore";


interface MyProps {
    phone: IPhone;
    addPhoneToCart: (phone: IPhone) => void;
}

export class CatalogItem extends React.Component<MyProps, {}> {
    render() {
        return (
            <div className='col-sm-4'>
                <div className='card' style={{ width: '13rem' }}>
                    <img className='card-img-top' src='phone.png' alt='Phone image' />
                    <div className='card-body'>
                        <h5 className='card-title'>{this.props.phone.name}</h5>
                        <p className='card-text'>Price: {this.props.phone.price}$</p>
                        <a href='#' className='btn btn-primary' onClick={() => { this.props.addPhoneToCart(this.props.phone) }}>Add to cart</a>
                    </div>
                </div>
            </div>
        );
    }
};

