import React, {Component} from 'react';
import './landingPage.css';
import LoginModal from '../loginModal/LoginModal';
import SignUpModal from '../signupModal/signupModal';

export default class LandingPage extends Component {
    state = {
        showLogin: false,
        showSignUp: false
    };

    showLoginFxn = () => {
        this.setState({ showLogin: true })
    };

    hideLoginFxn = () => {
        this.setState({ showLogin: false })
    }

    showSignUpFxn = () => {
        this.setState({ showSignUp: true })
    };

    hideSignUpFxn = () => {
        this.setState({ showSignUp: false })
    }
    render(){
        return (
            <div className="landing-page-container">
                <LoginModal show={this.state.showLogin} handleClose={this.hideLoginFxn}/>
                <SignUpModal show={this.state.showSignUp} handleClose={this.hideSignUpFxn}/>
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
                        <button type="button" className="log-in-btn" onClick={this.showLoginFxn}>Log In</button>
                        <p className="sign-up-link" onClick={this.showSignUpFxn}>Sign Up</p>
                    </div>
                </section>
            </div>
        )
    }
}