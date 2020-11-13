import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Destination from './components/home/Destination/Destination';
import CreateDestination from './components/home/Destination/CreateDestination';
import {
  Header,
  DestinationsList,
  Buddies,
  Profile,
} from './components/organisms';
import { UserNav } from './components/molecules';
import { Footer, NotFound } from './components/atoms';
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
      destinations: [],
    };

    this.handleUser = this.handleUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.createDestination = this.createDestination.bind(this);
    this.editDestination = this.editDestination.bind(this);
    this.deleteDestination = this.deleteDestination.bind(this);
    this.visitDestination = this.visitDestination.bind(this);
    this.unlikeDestination = this.unlikeDestination.bind(this);
  }

  handleUser(userData) {
    let requestType = userData.username ? 'signup' : 'login';

    const userService = new UserService();
    userService
      .processLogRequest(requestType, userData)
      .then((response) => {
        if (!response.success) {
          toast.error(response.message);
        } else {
          if (requestType === 'login') {
            toast.success(response.message);
            window.localStorage.setItem('token', response.token);
            window.localStorage.setItem('username', response.user.username);
            window.localStorage.setItem('isAdmin', response.user.roles);
            this.setState({
              token: response.token,
              username: response.user.username,
              isAdmin: response.user.roles[0],
            });
          } else {
            toast.success(response.message);
            userData.username = null;
            this.handleUser(userData);
          }
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  }

  logoutUser(event) {
    event.preventDefault();

    const logout = new UserService();
    logout
      .logoutCurrentUser()
      .then((response) => {
        if (!response.success) {
          toast.error(response.message);
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          localStorage.removeItem('isAdmin');
          toast.success(response.message);
          this.setState({
            token: null,
            username: null,
            isAdmin: false,
          });
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  }

  createDestination(data) {
    const createNewDestination = new DestinationsService();
    createNewDestination
      .createNewDestination(data)
      .then((response) => {
        if (!response.success) {
          toast.error(response.message);
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
        token: localStorage.getItem('token'),
        username: localStorage.getItem('username'),
        isAdmin: !!localStorage.getItem('isAdmin'),
      });
    } else {
      this.setState({
        token: null,
        username: null,
        isAdmin: false,
      });
    }
  }

  async getAllDestinationFromDatabase() {
    try {
      const destinations = await new DestinationsService().getAllDestinations();
      //toast.success("Destinations loaded successfully!");
      this.setState({
        destinations,
      });
    } catch (error) {
      toast.error(error);
    }
  }

  editDestination(id, data) {
    const editDestination = new DestinationsService();
    editDestination
      .editCurrentDestination(id, data)
      .then((response) => {
        if (!response.success) {
          toast.error(response.message);
        } else {
          toast.success(response.message);
          this.getAllDestinationFromDatabase();
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  }

  deleteDestination(id) {
    const removeDestination = new DestinationsService();
    removeDestination
      .deleteCurrentDestination(id)
      .then((response) => {
        if (!response.success) {
          toast.error(response.message);
        } else {
          toast.success(response.message);
          this.getAllDestinationFromDatabase();
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  }

  visitDestination(id) {
    const visit = new DestinationsService();
    visit
      .visitCurrentDestination(id)
      .then((response) => {
        if (!response.success) {
          toast.error(response.message);
        } else {
          toast.success(response.message);
          this.getAllDestinationFromDatabase();
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  }

  unlikeDestination(id) {
    const unsubscribe = new DestinationsService();
    unsubscribe
      .unsubscribeCurrentDestination(id)
      .then((response) => {
        if (!response.success) {
          toast.error(response.message);
        } else {
          toast.success(response.message);
          this.getAllDestinationFromDatabase();
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  }

  render() {
    return (
      <div className='App'>
        <BrowserRouter>
          <Fragment>
            <ToastContainer
              closeButton={false}
              autoClose={2000}
              transition={Flip}
            />

            <Header
              username={this.state.username}
              isAdmin={this.state.isAdmin}
              logoutUser={this.logoutUser}
            />

            <Switch>
              <Route
                path='/'
                exact
                render={() => (
                  <DestinationsList
                    username={this.state.username}
                    destinations={this.state.destinations}
                  />
                )}
              />
              <Route
                path='/user'
                render={(props) =>
                  this.state.username ? (
                    <Redirect to='/' />
                  ) : (
                    <UserNav {...props} handleUser={this.handleUser} />
                  )
                }
              />
              <Route
                path='/profile'
                render={(props) =>
                  this.state.username ? (
                    <Profile
                      {...props}
                      destinations={this.state.destinations}
                      username={this.state.username}
                      isAdmin={this.state.isAdmin}
                      unlikeDestination={this.unlikeDestination}
                    />
                  ) : (
                    <Redirect to='/' />
                  )
                }
              />
              <Route
                path='/create'
                render={(props) =>
                  this.state.isAdmin || this.state.isAdmin.length > 0 ? (
                    <CreateDestination
                      {...props}
                      createDestination={this.createDestination}
                    />
                  ) : (
                    <Redirect to='/' />
                  )
                }
              />
              <Route
                path='/buddies'
                render={(props) =>
                  this.state.username ? (
                    <Buddies
                      {...props}
                      travelers={this.state.destinations}
                      username={this.state.username}
                    />
                  ) : (
                    <Redirect to='/' />
                  )
                }
              />
              <Route
                path='/destination'
                render={(props) =>
                  this.state.username ? (
                    <Destination
                      {...props}
                      username={this.state.username}
                      isAdmin={this.state.isAdmin}
                      editDestination={this.editDestination}
                      deleteDestination={this.deleteDestination}
                      visitDestination={this.visitDestination}
                    />
                  ) : (
                    <Redirect to='/' />
                  )
                }
              />
              <Route component={NotFound} />
            </Switch>

            <Footer />
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
