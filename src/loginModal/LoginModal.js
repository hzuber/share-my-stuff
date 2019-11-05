import React from 'react'; 
import { Link } from 'react-router-dom';
import './LoginModal.css'

const LoginModal = ({ handleClose, show }) => {
    const showHideClassName = show ? "login-modal display-block" : "login-modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="login-modal">
                <button type="button" className="login-close" onClick={handleClose}>X</button>
                <form className="login-modal-form">
                    <h2>Log In</h2>
                    <label for="username">Enter username or email address:</label>
                    <br />
                    <input type="text" name="username" id="username" />
                    <br />
                    <label for="password">Password:</label>
                    <br />
                    <input type="text" name="password" id="password" />
                    <br />
                    <p class="get-hint">Get password hint</p>
                    <p class="get-hint">Reset password</p>
                    <Link to = {`/userPage`}>
                        <button type="submit" class="login-button">
                            Login
                        </button>
                    </Link>
                </form>
            </section>   
            <div className="complete-overlay" onClick={handleClose}>
            </div>
        </div>
    )
}

export default LoginModal;