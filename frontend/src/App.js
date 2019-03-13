import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/general/Header';
import Footer from './components/general/Footer';
import Home from './components/home/Home';
import User from './components/user/User';
import CreateDestination from './components/home/Destination/CreateDestination';
import NotFound from './components/general/NotFound';

import UserService from './services/authentication';
import DestinationsService from './services/get-destinations';
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
        this.createDestination = this.createDestination.bind(this);
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
                        toast.success(response.message);
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

        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("isAdmin");

        toast.success("Logged out successfully");

        this.setState({
            token: null,
            username: null,
            isAdmin: false
        });
    }

    createDestination(data) {
        const createNewDestination = new DestinationsService();
        createNewDestination.createNewDestination(data)
            .then(response => {
                if (!response.success) {
                    toast.error(response.message)
                } else {
                    toast.success(response.message);
                    
                    this.getAllDestinationFromDatabase();
                }
            })
            .catch((err) => {
                toast.error(err);
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

    async getAllDestinationFromDatabase () {
        try {
            const destinations = await new DestinationsService().getAllDestinations();
            //toast.success("Destinations loaded successfully!");
            this.setState({
                destinations
            })
        } catch (error) {
            toast.error(error);
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
                            <Route path="/user" render={(props) => this.state.username
                                ? <Redirect to="/" />
                                : <User {...props} handleUser={this.handleUser} /> 
                            }/>
                            <Route path="/create" render={(props) => this.state.isAdmin
                                ? <CreateDestination {...props} createDestination={this.createDestination} />
                                : <Redirect to="/" />
                            }/>
                            <Route component={NotFound} />
                        </Switch>

                        <Footer/>
                    </Fragment>
                </BrowserRouter>
            </div>
        );
    }

    componentDidMount() {
        this.getAllDestinationFromDatabase();
    }
}

export default App;
