import * as React from "react";
import { connect } from 'react-redux';
import { IOrder, IStoreState } from "../store/configureStore";
import { userLogin } from "./userActions";

interface MyProps {
    orders: IOrder[];
    userLogin: (email: string, password: string) => void;
}

class UserLogin extends React.Component<MyProps, {}> {
    public refs: {
        email: HTMLInputElement;
        password: HTMLInputElement;
    };

    login = () => {
        this.props.userLogin(this.refs.email.value, this.refs.password.value)
    }

    render() {
        return (

            <div>
                <form>
                    <input type="text" id="login" ref="email" placeholder="email" />
                    <input type="text" id="password" ref="password" placeholder="password" />
                    <button style={{ marginLeft: '15px' }} type="button" 
                        onClick={this.login}>
                        Login
                    </button>
                </form>
            </div>

        );
    }
};

let mapProps = (state: IStoreState) => {
    return {
        orders: state.admin.orders
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    userLogin: (email: string, password: string) => dispatch(userLogin(email, password))
});


export default connect(mapProps, mapDispatchToProps)(UserLogin) 