import React from 'react';
import { Redirect } from 'react-router-dom';

import './Register.css';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            email: null,
            password: null,
            isLoggedIn: false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        //console.log(`${event.target.name} -> ${event.target.value}`)
        this.setState({
            [event.target.name]: event.target.value 
        })
    }

    render() {
        if (this.state.isLoggedIn) {
            return (
                <Redirect to="/" />
            ) 
        }

        return (        
               <form className="Register" onSubmit={(event) => {
                    event.preventDefault();
                    this.props.handleUser(this.state);
                    if (this.state.email && this.state.email.length > 3 && this.state.email.includes('@')) {
                        if (this.state.password && this.state.password.length > 7) {
                            if (this.state.username && this.state.username.length > 4) {
                                this.setState({
                                    isLoggedIn: true
                                })
                            }
                        }
                    }    
               }} >
                    
                    <div className="container">
                        <div className="register-form">
                            <h2>Welcome to our site</h2>
                            <hr className="to-right" />
                            <hr className="to-left" />
                            <div className="container-register">
                
                                <label>Username</label>
                                <input type="text" name="username" onChange={this.handleChange} placeholder="Your username" />
                                
                                <label>E-mail</label>
                                <input type="text" name="email" onChange={this.handleChange} placeholder="Your e-mail" />
                    
                                <label>Password</label>
                                <input type="password" name="password" onChange={this.handleChange} placeholder="Your password" />
                        
                                <button type="submit">Register !</button>
                            </div>
                        </div>
                    </div>
                </form>
            )
    }
}

export default Register;
