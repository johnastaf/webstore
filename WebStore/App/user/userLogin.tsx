import * as React from "react";
import { connect } from 'react-redux';
import { IUser, IStoreState } from "../store/configureStore";
import { userLogin } from "./userActions";
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login'
import { userAutorized } from '../user/userActions';
import { Link } from "react-router-dom";

interface MyProps {
    userLogin: (email: string, password: string) => void;
    userAutorized: (user: IUser) => void;
    user: IUser;
}

class UserLogin extends React.Component<MyProps, {}> {
    public refs: {
        email: HTMLInputElement;
        password: HTMLInputElement;
    };

    login = () => {
        this.props.userLogin(this.refs.email.value, this.refs.password.value)
    }

    responseFacebook = (userInfo: ReactFacebookLoginInfo) => {
        console.log((userInfo));

        console.log(JSON.stringify(userInfo));

        if (userInfo.accessToken != null) {
            let user: IUser = {
                isLogged: true,
                name: userInfo.name,
                email: userInfo.email
            }

            this.props.userAutorized(user);
        }
    }

    render() {
        return (
            this.props.user.isLogged === true
                ? <div>Welcome to WebStore, {this.props.user.name}</div>
                : <div className="container">
                    <div className="card bg-light">
                        <article className="card-body mx-auto" style={{ maxWidth: '400px' }}>
                            <Link to="/register" className="float-right btn btn-outline-primary">Sign up</Link>
                            <h4 className="card-title mb-4 mt-1">Sign in</h4>
                            <p>
                                <FacebookLogin
                                    appId="231121177769691"
                                    fields="name,email"
                                    callback={this.responseFacebook}
                                    cssClass="btn btn-block btn-outline-primary fab"
                                    textButton="    Login via facebook"
                                    icon="fa-facebook-f"
                                />
                            </p>
                            <hr />
                            <form>
                                <div className="form-group">
                                    <input name="" ref="email" className="form-control" placeholder="Email" type="email" />
                                </div>
                                <div className="form-group">
                                    <input ref="password" className="form-control" placeholder="******" type="password" />
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary btn-block" onClick={this.login}>Login</button>
                                        </div>
                                    </div>
                                    <div className="col-md-6 text-right">
                                        <a className="small" href="#">Forgot password?</a>
                                    </div>
                                </div>
                            </form>
                        </article>
                    </div>
                </div>
        );
    }
};

let mapProps = (state: IStoreState) => {
    return {
        user: state.user.user
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    userLogin: (email: string, password: string) => dispatch(userLogin(email, password)),
    userAutorized: (user: IUser) => dispatch(userAutorized(user)),
});


export default connect(mapProps, mapDispatchToProps)(UserLogin) 