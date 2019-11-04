import React from 'react';
import './navBar.css';

function NavBar(props) {
    const {pathname} = props.location;
    if(pathname === "/") {
        return null;
    }
    return (
        <nav className="nav-bar">
            <ul className="nav-ul">
                <li className="nav-header">
                    SHARE MY STUFF
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;