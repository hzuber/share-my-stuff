import React, {Component} from 'react'; 
import './LoginModal.css';
import { withRouter } from 'react-router-dom'
import ShareContextMain from '../shareContextMain';
import ValidationError from '../validationError'

class LoginModal extends Component{
    //state keeps track of whether input field has been clicked on yet or not
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
//validates email and password provided against all users in context
    userMatch(email, password){
        const {users} = this.context;
        const thisUser = users.find(user => user.email === email)
        if (!thisUser || thisUser.password !== password){
            return 'Some of the information entered is incorrect.'
        } else {
        this.handleSubmit(thisUser.id)
        }
    }
//lets client try to re-enter login info
    tryAgain = () => {
        this.setState({
            clicked: false
        })
    }
//bring client to their page
    handleSubmit(id){
        const {history} = this.props
        history.push(`/userPage/${id}`)
    }

    render(){
        const { showLogin, hideLoginFxn } = this.context;
        const {clicked} = this.state
        const loginError = this.userMatch();
        const showHideClassName = showLogin ? "login-modal display-block" : "login-modal display-none";
        const {pathname} = this.props.location;
            if( pathname !== "/login" ) {
                return null;
            }
        return (
            <div className={showHideClassName}>
                <section className="login-modal modal">
                    <button type="button" className="login-close close" onClick={hideLoginFxn}>X</button>
                    <form className="login-modal-form" onSubmit={ this.handleVerification}>
                        <h2>Log In</h2>
                        <label htmlFor="email">Enter email address:</label>
                        <br />
                        <input type="text" name="email" id="email" onChange={e => this.tryAgain(e)}/>
                        <br />
                        <label htmlFor="password">Password:</label>
                        <br />
                        <input type="password" name="password" id="password" onChange={e => this.tryAgain(e)} />
                        <br />
                        <button type="submit" className="login-button main-btn">
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