import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/general/Header';
import Footer from './components/general/Footer';
import Home from './components/home/Home';
import Login from './components/login/Login';

import './App.css';

class App extends Component {



    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Fragment>
                        <Header />

                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/destination/:id" component={Home} />
                            <Route path="/login" exact component={Login} />
                        </Switch>

                        <Footer/>
                    </Fragment>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
