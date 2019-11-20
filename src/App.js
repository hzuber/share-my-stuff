import React, { Component } from 'react';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import './App.css';
import config from './config'
import NavBar from './navBar/navBar'
import LandingPage from './landingPage/landingPage';
import UserPage from './userPage/userPage'
import ShareContext from './shareContext';
import SignUpModal from './signupModal/signupModal';
import LoginModal from './loginModal/LoginModal';
import ShareError from './shareError'
import AddItem from './addItem/addItem';
import LargeItemCard from './largeItemCard/largeItemCard'

class App extends Component {
  state = {
    users: [],
    items: [],
    itemList: [],
    error: null,
    showLogin: false,
    showSignUp: false,
    addItemShowing: false,
    filter: 'no-filter'
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

  showAddItem = () => {
      this.setState({
          addItemShowing: true
      })
  }

  hideAddItem = () => {
      this.setState({
          addItemShowing: false
      })
      this.props.history.goBack()
  }

  handleAddtoAllItema = (item) => {
      console.log(item)
      const {items} = this.state;
      const newId = items.length + 1;
      const newItem = {...item, id:newId};
      this.setState({
          items: [...items, newItem],
          },
          this.runFilter
      )
  }

  updateAllItems = (newItems) => {
    this.setState({items: newItems})
  }

  handleDeleteItem = (id) => {
      const {items} = this.state;
      const newList = items.filter(item => item.id !== id)
      this.setState({
          items: newList,
          },
          this.runFilter
      )
  }

  handleFilterChange = (e) => {
      this.setState({
          filter: (e.target.value)
      }, this.runFilter)
  }

  runFilter =() => {
      this.setState({
          itemList: this.filterItems()
      })
  }

  filterItems = () => {
      const { items, filter } = this.state
      if (filter === "no-filter") {
          return items
      } else if (filter === "borrowed") {
          return items.filter(item => item.borrowed === true)
      } else if (filter === "not-borrowed") {
          return items.filter(item => item.borrowed === false)
      } else {
          return items.filter(item => item.type === filter)
      }
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
        if(!itemRes.ok) 
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
      items: this.state.items,
      error: this.state.error,
      setError: this.setError,
      showLogin: this.state.showLogin,
      showSignUp: this.state.showSignUp,
      newUserSignUp: this.newUserSignUp,
      showLoginFxn: this.showLoginFxn,
      hideLoginFxn: this.hideLoginFxn,
      showSignUpFxn: this.showSignUpFxn,
      hideSignUpFxn: this.hideSignUpFxn,
      filter: this.state.filter,
      addItemShowing: this.state.addItemShowing,
      showAddItem : this.showAddItem,
      hideAddItem: this.hideAddItem,
      handleFilterChange: this.handleFilterChange,
      runFilter: this.runFilter,
      handleAddtoAllItems: this.handleAddItem,
      handleDeleteItem: this.handleDeleteItem,
      updateAllItems: this.updateItems
    }

    return (
      <div className="App">
        <BrowserRouter>
          <ShareContext.Provider value={contextValue}>
            <header className="App-header">
              <Route path='/' component={NavBar} />
            </header>
            <main>
              <ShareError>
                <Route exact path='/login' component={LoginModal} />
                <Route exact path='/signup' component={SignUpModal} />
                <Route exact path='/:modal(login|signup|)' component={LandingPage} />
                <Route path='/userPage/:user_id/' component={UserPage} />
                <Route exact path = '/userPage/:user_id/addItem' component={AddItem}/>
                <Route exact path = '/userPage/:user_id/:item_id' component={LargeItemCard}/>
              </ShareError>
            </main>
          </ShareContext.Provider>
        </BrowserRouter>
      </div>
    );
  }
}

export default withRouter(App);
