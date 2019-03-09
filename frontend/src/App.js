import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/general/Header';
import Footer from './components/general/Footer';
import Home from './components/home/Home';
import Login from './components/user/Login';
import Register from './components/user/Register';
import UserService from './services/authentication';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null
        }

        this.handleUser = this.handleUser.bind(this);
    }

    handleUser(userData) {
        let requestType = userData.username ? 'signup' : 'login';
        console.log(requestType);
        const userService = new UserService();
        userService.processLogRequest(requestType, userData)
            .then(response => {
                if (!response.success) {
                    console.log(response)
                } else {
                    // TODO: set to localStorage
                    console.log(response)
                }
            }).catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Fragment>
                        <Header />

                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/destination/:id" component={Home} />
                            <Route path="/login" render={() => <Login handleUser={this.handleUser} />} />
                            <Route path="/register" render={() => <Register handleUser={this.handleUser} />} />
                        </Switch>

                        <Footer/>
                    </Fragment>
                </BrowserRouter>
            </div>
        );
    }

    componentWillMount() {
        const localUser = localStorage.getItem('currentUser');
        if (localUser) {
            this.setState({
                currentUser: localUser
            });
        }
    }
}

export default App;
