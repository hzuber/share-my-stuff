import React from 'react'; 
import { Link } from 'react-router-dom';
import './signupModal.css'

const SignUpModal = ({ handleClose, show }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section class="modal">
                <button type="button" className="close" onClick={handleClose}>X</button>
                <form className="modal-form">
                    <h2>Create A New Account</h2>
                    <label for="username">Choose a Username:</label>
                    <br />
                    <input type="text" name="username" id="username"/>
                    <br />
                    <label for="fullname">Full Name:</label>
                    <br />
                    <input type="text"name="fullname" id="fullname"/>
                    <br />
                    <label for="email">Email:</label>
                    <br />
                    <input type="text" name="email" id="email"/>
                    <br />
                    <label for="phone">Phone:</label>
                    <br />
                    <input type="text" name="number" id="number"/>
                    <br />
                    <label for="password">Password:</label>
                    <br />
                    <input type="text" name="password" id="password"/>
                    <br />
                    <label for="confirm">Confirm password:</label>
                    <br />
                    <input type="text" name="confirm" id="confirm"/>
                    <br />
                    <label for="hint">Choose a password hint:</label>
                    <br />
                    <input type="text" name="hint" id="hint"/>
                    <br />
                    <Link to = {`/userPage`}>
                        <button type="submit" class="sign-up-button">
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

export default SignUpModal;