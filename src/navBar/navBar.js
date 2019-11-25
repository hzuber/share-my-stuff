import React, {Component} from 'react';
import './navBar.css';
import { Link } from 'react-router-dom'

class NavBar extends Component {
    static defaultProps = {
        location: '/'
    }
    handleLogoutClick = () => {
    }

    render(){
        const {pathname} = this.props.location;
        if(pathname === "/" || pathname === "/login" || pathname === "/signup") {
            return null;
        }
    return (
        <nav className="nav-bar">
            <ul className="nav-ul">
                <Link to={('/')}>
                    <li className="nav-header">
                        SHARE MY STUFF
                    </li>
                </Link>
                <Link
                    onClick={this.handleLogoutClick}
                    to='/'>
                    Logout
                </Link>
            </ul>
        </nav>
    )
}
}

export default NavBar;