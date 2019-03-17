import React from 'react';
import { Redirect } from 'react-router-dom';

import './Login.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            isLoggedIn: false,
            isDisabled: true,
            errorEmail: "wrong",
            errorPass: "wrong"
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        if (event.target.name === "email") {
            let validEmail = (event.target.name === "email" && event.target.value.includes('@') && event.target.value.length > 3) ? false : true;
            let buttonData = true;
            let isError = "wrong";

            if (!validEmail) {
                buttonData = false;
                isError = "correct";
            }
            this.setState({
                [event.target.name]: event.target.value,
                isDisabled: buttonData,
                errorEmail: isError
            })
        }
        if (event.target.name === "password") {
            let validPassword = (event.target.name === "password" && event.target.value.length > 7) ? false : true;
            let buttonData = true;
            let isError = "wrong";

            if (!validPassword) {
                buttonData = false;
                isError = "correct";
            }
            this.setState({
                [event.target.name]: event.target.value,
                isDisabled: buttonData,
                errorPass: isError
            })
        }
    }

    render() {    
        if (this.state.isLoggedIn) {
            return (
                <Redirect to="/" />
            ) 
        }
       
        return (           
            <form className="Login" onSubmit={(event) => {
                event.preventDefault();
                this.props.handleUser(this.state);
                if (this.state.email && this.state.email.length > 3 && this.state.email.includes('@')) {
                    if (this.state.password && this.state.password.length > 7) {
                        this.setState({
                            isLoggedIn: true
                        })
                    }
                }
            }} >
                
                <div className="container">
                    <div className="login-form">
                        <h2>Welcome to our site</h2>
                        <hr className="to-right" />
                        <hr className="to-left" />
                        <div className="container-login">
            
                            <label>E-mail</label>
                            <input type="text" name="email" className={this.state.errorEmail} onChange={this.handleChange} placeholder="Your e-mail" />
                
                            <label>Password</label>
                            <input type="password" name="password" className={this.state.errorPass} onChange={this.handleChange} placeholder="Your password" />
                    
                            <button type="submit"  disabled={this.state.isDisabled}>Login</button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

export default Login;
