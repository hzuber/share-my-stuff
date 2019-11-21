import React, { Component } from 'react';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import './App.css';
import config from './config'
import NavBar from './navBar/navBar'
import LandingPage from './landingPage/landingPage';
import UserPage from './userPage/userPage'
import ShareContextMain from './shareContextMain';
import SignUpModal from './signupModal/signupModal';
import LoginModal from './loginModal/LoginModal';
import ShareError from './shareError'

class App extends Component {
  state = {
    users: [],
    items: [],
    showLogin: false,
    showSignUp: false,
    error: null,
  };

  newUserSignUp = (newUser) => {
    this.setState({
      users: [...this.state.users, { newUser }]
    })
  }

  setError = (error) => {
    this.setState({
      error
    })
  }

  showLoginFxn = () => {
    this.setState({ showLogin: true })
  };

  hideLoginFxn = () => {
    this.setState({ showLogin: false })
    this.props.history.push('/')
  }

  showSignUpFxn = () => {
    this.setState({ showSignUp: true })
  };

  hideSignUpFxn = () => {
    this.setState({ showSignUp: false })
    this.props.history.push('/')
  }

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_BASE_URL}/api/users`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      }),
      fetch(`${config.API_BASE_URL}/api/items`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      })
    ])
      .then(([userRes, itemRes]) => {
        if (!userRes.ok)
          return userRes.json().then(e => Promise.reject(e));
        if (!itemRes.ok)
          return itemRes.json().then(e => Promise.reject(e));

        return Promise.all([userRes.json(), itemRes.json()])
      })
      .then(([users, items]) => {
        this.setState({
          users: users,
          items: items,
          itemList: items
        })
      })
      .catch(error => this.setState({ error }))
  }

  render() {
    const contextValue = {
      users: this.state.users,
      items: this.state.itemList,
      error: this.state.error,
      setError: this.setError,
      showLogin: this.state.showLogin,
      showSignUp: this.state.showSignUp,
      newUserSignUp: this.newUserSignUp,
      hideSignUpFxn: this.hideSignUpFxn,
      hideLoginFxn: this.hideLoginFxn
    }

    return (
      <div className="App">
        <BrowserRouter>
          <header className="App-header">
            <Route path='/' component={NavBar} />
          </header>
          <main>
            <ShareError>
              <ShareContextMain.Provider value={contextValue}>
                <Route exact path='/login' component={LoginModal} />
                <Route exact path='/signup' component={SignUpModal} />
                <Route exact path='/:modal(login|signup|)' component={LandingPage} />
              </ShareContextMain.Provider>
              <Route path='/userPage/:user_id/' component={UserPage} />
            </ShareError>
          </main>
        </BrowserRouter>
      </div>
    );
  }
}

export default withRouter(App);
