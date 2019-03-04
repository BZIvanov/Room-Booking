import React from 'react';

import './Login.css';

class Login extends React.Component {
    render() {
        return (
            <React.Fragment>            
               <form className="Login" >
                    
                    <div className="container">
                        <div className="login-form">
                            <h2>Welcome to the paradise</h2>
                            <hr className="to-right" />
                            <hr className="to-left" />
                            <div className="container-login">
                
                                <label>Username</label>
                                <input type="text" placeholder="ex. Biser Ivanov" />
                    
                                <label>Password</label>
                                <input type="password" placeholder="ex. 12345  :)" />
                        
                                
                        
                                <button>Start !</button>
                            </div>
                        </div>
                    </div>
                </form>
            </React.Fragment>)
    }
}

export default Login;
