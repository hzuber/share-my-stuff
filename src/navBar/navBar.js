import React, {Component} from 'react';
import './navBar.css';
import { Link } from 'react-router-dom';
import ShareContextUserPage from '../shareContextUserPage'

class NavBar extends Component {
    static contextType = ShareContextUserPage

    render(){
        const {user} = this.context;
        return (
            <nav className="nav-bar">
                <ul className="nav-ul">
                    <Link to={('/')}>
                        <li className="nav-header">
                            SHARE MY STUFF
                        </li>
                    </Link>
                    <li className="welcome-header">
                        Welcome {user.name}!
                    </li>
                </ul>
            </nav>
        )
    }
}

export default NavBar;