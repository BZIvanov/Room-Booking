import React from 'react';

import './Register.css';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            email: null,
            password: null
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
        return (
            <React.Fragment>            
               <form className="Register" onSubmit={(event) => {
                   event.preventDefault();
                   this.props.handleUser(this.state);
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
            </React.Fragment>)
    }
}

export default Register;
