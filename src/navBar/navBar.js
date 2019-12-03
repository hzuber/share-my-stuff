import React, {Component} from 'react';
import './navBar.css';
import { withRouter } from 'react-router-dom';
import ShareContextUserPage from '../shareContextUserPage'

class NavBar extends Component {
    static contextType = ShareContextUserPage

    backToHome = () => {
        this.props.history.push('/');
        window.location.reload()
    }

    render(){
        const {user} = this.context;
        return (
            <nav className="nav-bar">
                <ul className="nav-ul">
                        <li className="nav-header" onClick = {() => {this.backToHome()}}>
                            SHARE MY STUFF
                        </li>
                    <li className="welcome-header">
                        Welcome {user.name}!
                    </li>
                </ul>
            </nav>
        )
    }
}

export default withRouter(NavBar);