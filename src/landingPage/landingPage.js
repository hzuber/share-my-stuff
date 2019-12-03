import React, {Component} from 'react';
import {Link, BrowserRouter as Router} from 'react-router-dom'
import './landingPage.css';
import ShareContextMain from '../shareContextMain';

export default class LandingPage extends Component {
    static contextType = ShareContextMain;
    
    render(){
        const { showLoginFxn, showSignUpFxn } = this.context;
        return (
            <>
                    <div className="landing-page-container">
                        <section className="landing-page-header">
                            <h1>SHARE MY STUFF</h1>
                        </section>
                        <section className="landing-page-content">
                            <h3>
                                We know you love to spread your wealth, but it can be easy lose track of who has what. 
                                With Share My Stuff, you can share your stuff with greater peace of mind. 
                                Upload items that you've loaned out and with a single click, mark them borrowed or returned. 
                                Write in who has them, so you know who to chase after when you need it again! 
                                Let us make it easier for you to be generous.
                            </h3>
                            <div className="button-wrapper">
                                <Link to='/login'>
                                    <button type="button" className="log-in-btn main-btn" onClick={showLoginFxn}>Login</button>
                                </Link>
                                <Link to="/signup">
                                    <p className="sign-up-link" onClick={showSignUpFxn}>Sign Up</p>
                                </Link>
                            </div>
                        </section>
                    </div>
            </>
        )
    }
}