import React from 'react';
import './navBar.css';
import { Link } from 'react-router-dom'

function NavBar(props) {
    const {pathname} = props.location;
    if(pathname === "/" || pathname=== "/signup" || pathname === "/login") {
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
            </ul>
        </nav>
    )
}

export default NavBar;