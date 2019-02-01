import * as React from "react";
import { connect } from 'react-redux';
import { IUser } from "../store/configureStore";
import { userRegister } from "./userActions";
import { userAutorized } from '../user/userActions';
import { Link } from "react-router-dom";

interface MyProps {
    userRegister: (name: string, email: string, password: string) => void;
    userAutorized: (user: IUser) => void;
}

class UserRegister extends React.Component<MyProps, {}> {
    public refs: {
        name: HTMLInputElement;
        email: HTMLInputElement;
        password: HTMLInputElement;
    };

    register = () => {
        this.props.userRegister(this.refs.name.value, this.refs.email.value, this.refs.password.value)
    }

    render() {
        return (
            <div className="card bg-light">
                <article className="card-body mx-auto" style={{ maxWidth: '400px' }}>
                    <h4 className="card-title mt-3 text-center">Create Account</h4>
                    <hr />
                    <form>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                            </div>
                            <input name="" ref="name" className="form-control" placeholder="Full name" type="text" />
                        </div>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                            </div>
                            <input name="" ref="email" className="form-control" placeholder="Email address" type="email" />
                        </div>


                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                            </div>
                            <input ref="password" className="form-control" placeholder="Create password" type="password" />
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block" onClick={this.register}> Create Account  </button>
                        </div>

                        <p className="text-center">Have an account? <Link to="/login">Log In</Link> </p>

                    </form>
                </article>
            </div>
        );
    }
};


const mapDispatchToProps = (dispatch: any) => ({
    userRegister: (name: string, email: string, password: string) => dispatch(userRegister(name, email, password)),
    userAutorized: (user: IUser) => dispatch(userAutorized(user)),
});


export default connect(null, mapDispatchToProps)(UserRegister) 