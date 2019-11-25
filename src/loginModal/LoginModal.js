import React, {Component} from 'react'; 
import './LoginModal.css';
import { withRouter } from 'react-router-dom'
import ShareContextMain from '../shareContextMain';
import ValidationError from '../validationError';
import TokenService from '../services/token-service'

class LoginModal extends Component{
    state = {
        clicked: false
    }
    static contextType = ShareContextMain;
    
    handleVerification = (e) => {
        e.preventDefault();
        const {email, password} = e.target
        this.setState({
            clicked: true
        })
        this.userMatch(email.value, password.value)
    }

    userMatch(email, password){
        const {users} = this.context;
        const thisUser = users.find(user => user.email === email)
        if (!thisUser || thisUser.password !== password){
            return 'Some of the information entered is incorrect.'
        } else {
        this.handleSubmit(thisUser.id, email, password)
        }
    }

    tryAgain = () => {
        this.setState({
            clicked: false
        })
    }

    handleSubmit(id, email, password){
        const {history} = this.props
        TokenService.saveAuthToken(
            TokenService.makeBasicAuthToken(email.value, password.value)
        )
        history.push(`/userPage/${id}`)
    }

    render(){
        const { showLogin, hideLoginFxn } = this.context;
        const {clicked} = this.state
        const loginError = this.userMatch();
        const showHideClassName = showLogin ? "login-modal display-block" : "login-modal display-none";

        return (
            <div className={showHideClassName}>
                <section className="login-modal">
                    <button type="button" className="login-close" onClick={hideLoginFxn}>X</button>
                    <form className="login-modal-form" onSubmit={ this.handleVerification}>
                        <h2>Log In</h2>
                        <label htmlFor="email">Enter email address:</label>
                        <br />
                        <input type="text" name="email" id="email" onChange={e => this.tryAgain(e)}/>
                        <br />
                        <label htmlFor="password">Password:</label>
                        <br />
                        <input type="text" name="password" id="password" onChange={e => this.tryAgain(e)} />
                        <br />
                        <p className="get-hint">Get password hint</p>
                        <p className="get-hint">Reset password</p>
                        <button type="submit" className="login-button">
                            Login
                        </button>
                        {clicked && <ValidationError message = {loginError} />}
                    </form>
                </section>   
                <div className="complete-overlay" onClick={hideLoginFxn}>
                </div>
            </div>
        )
    }
}

export default withRouter(LoginModal)