import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/general/Header';
import Footer from './components/general/Footer';
import Home from './components/home/Home';
import Login from './components/user/Login';
import Register from './components/user/Register';
import UserService from './services/authentication';
import DestinationsService from './services/get-destinations';
import NotFound from './components/general/NotFound';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null,
            username: null,
            isAdmin: false,
            destinations: []
        }

        this.handleUser = this.handleUser.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
    }

    handleUser(userData) {
        let requestType = userData.username ? 'signup' : 'login';
        
        const userService = new UserService();
        userService.processLogRequest(requestType, userData)
            .then(response => {
                if (!response.success) {
                    toast.error(response.message);
                } else {
                    if (requestType === "login") {
                        toast.success(response.message);
                        window.localStorage.setItem('token', response.token);
                        window.localStorage.setItem('username', response.user.username);
                        window.localStorage.setItem('isAdmin', response.user.roles);
                        this.setState({
                            token: response.token,
                            username: response.user.username,
                            isAdmin: response.user.roles
                        });
                    } else {
                        console.log(response);
                        userData.username = null;
                        this.handleUser(userData);
                    }
                }
            }).catch((err) => {
                toast.error(err);
            });
    }

    logoutUser(event) {
        event.preventDefault();

        sessionStorage.removeItem("token");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("isAdmin");

        toast.success("Logged out successfully");

        this.setState({
            token: null,
            username: null,
            isAdmin: false
        });
    }

    componentWillMount() {
        const token = window.localStorage.getItem('token');
        
        if (token) {
            this.setState({
                token: localStorage.getItem("token"),
                username: localStorage.getItem("username"),
                isAdmin: !!localStorage.getItem("isAdmin")
            });
        } else {
            this.setState({
                token: null,
                username: null,
                isAdmin: false
            });
        }
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Fragment>
                        <ToastContainer />

                        <Header username={this.state.username} isAdmin={this.state.isAdmin} logoutUser={this.logoutUser} />

                        <Switch>
                            <Route path="/" exact render={() => <Home username={this.state.username} destinations={this.state.destinations} />} />
                            <Route path="/destination/:id" component={Home} />
                            <Route path="/login" render={() => <Login handleUser={this.handleUser} />} />
                            <Route path="/register" render={() => <Register handleUser={this.handleUser} />} />
                            <Route component={NotFound} />
                        </Switch>

                        <Footer/>
                    </Fragment>
                </BrowserRouter>
            </div>
        );
    }

    async componentDidMount() {
        try {
            const destinations = await new DestinationsService().getAllDestinations();
            toast.success("Destinations loaded successfully!");
            this.setState({
                destinations
            })
        } catch (error) {
            toast.error(error);
        }
    }
}

export default App;
