import React, { Component } from 'react';
import Input from '../common/Input';
import { register, login } from '../../api/remote';
import toastr from 'toastr';

export default class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            repeat: '',
            nameHasError: '',
            emailHasError: '',
            passwordHasError: '',
            repeatPasswordHasError: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmitHandler(e) {
        e.preventDefault();
        if (this.state.repeat.length < 5 && this.state.password.length < 5) {
            this.setState({ passwordHasError: "true" })
            this.setState({ repeatPasswordHasError: "true" })
            toastr.error("Password's legth must be a liast 5 letter");
            return
        }
        if (this.state.repeat !== this.state.password) {
            this.setState({ repeatPasswordHasError: "true" })
            toastr.error("Password's didn't match!");
            return
        }
        let resReg = await register(this.state.name, this.state.email, this.state.password);
        if (!resReg.success) {
            console.log(resReg)
            if (resReg.errors.hasOwnProperty('name')) {
                this.setState({ nameHasError: "true" });
            }
            else {
                this.setState({ nameHasError: "false" });
            }

            if (resReg.errors.hasOwnProperty('email')) {
                this.setState({ emailHasError: "true" });
            }
            else {
                this.setState({ emailHasError: "false" });
            }

            if (resReg.errors.hasOwnProperty('password')) {
                this.setState({ passwordHasError: "true" });

            }
            else {
                this.setState({
                    passwordHasError: "false",
                    repeatPasswordHasError: "false"
                });
            }

            toastr.error(resReg.message);
            return;
        }
        toastr.success(resReg.message)

        let resLog = await login(this.state.email, this.state.password);
        if (!resLog.success) {
            toastr.error(resLog.message);
            return;
        }
        toastr.success(resLog.message)
        localStorage.setItem('authToken', resLog.token);
        localStorage.setItem('user', resLog.user.name);
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Register</h1>
                        <p>Please fill all fields.</p>
                    </div>
                </div>
                <form onSubmit={this.onSubmitHandler}>
                    <div className="row space-top">
                        <div className="col-md-4">
                            <Input
                                name="name"
                                value={this.state.name}
                                onChange={this.onChangeHandler}
                                label="Name"
                                error={this.state.nameHasError}
                            />
                            <Input
                                name="email"
                                value={this.state.email}
                                onChange={this.onChangeHandler}
                                label="E-mail"
                                error={this.state.emailHasError}
                            />
                            <Input
                                name="password"
                                type="password"
                                value={this.state.password}
                                onChange={this.onChangeHandler}
                                label="Password"
                                error={this.state.passwordHasError}
                            />
                            <Input
                                name="repeat"
                                type="password"
                                value={this.state.repeat}
                                onChange={this.onChangeHandler}
                                label="Repeat password"
                                error={this.state.repeatPasswordHasError}
                            />
                            <input type="submit" className="btn btn-primary" value="Register" />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}