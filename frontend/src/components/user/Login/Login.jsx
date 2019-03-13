import React from 'react';

import './Login.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            <form className="Login" onSubmit={(event) => {
                event.preventDefault();
                this.props.handleUser(this.state);
            }} >
                
                <div className="container">
                    <div className="login-form">
                        <h2>Welcome to our site</h2>
                        <hr className="to-right" />
                        <hr className="to-left" />
                        <div className="container-login">
            
                            <label>E-mail</label>
                            <input type="text" name="email" onChange={this.handleChange} placeholder="Your E-mail" />
                
                            <label>Password</label>
                            <input type="password" name="password" onChange={this.handleChange} placeholder="12345  :)" />
                    
                            <button type="submit">Login !</button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

export default Login;
