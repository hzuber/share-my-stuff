import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import NavBar from './navBar/navBar'
import LandingPage from './landingPage/landingPage';
import UserPage from './userPage/userPage'

class App extends Component {
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <Route path='/' component={NavBar}/>
        </header>
        <main>
          <Route exact path='/' component={LandingPage}/>
          <Route path='/userPage' component={UserPage}/>
        </main>
      </div>
    );
  }
}

export default App;
