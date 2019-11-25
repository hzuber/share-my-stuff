import React, {Component} from 'react'; 
import ShareContextMain from '../shareContextMain';
import { withRouter } from 'react-router-dom'
import config from '../config'
import ValidationError from '../validationError'
import './signupModal.css'


class SignUpModal extends Component{
    constructor(props){
        super(props);
        this.state= {
            fullname: '',
            email: {touched:false, value: ''},
            phone: '',
            password: {touched:false, value: ''},
            confirm: {touched:false, value: ''},
            hint: ''
        }
    }
    static contextType = ShareContextMain;

    updateText = (e) => {
        const key = e.target.id;
        const value = e.target.value;
        this.setState({
            [key]: value
        })
    }

    updateTextWithTouch = (e) => {
        const key = e.target.id;
        const value = e.target.value;
        this.setState({
            [key]:{touched: true, value}
        })
    }

    validatePassword = () => {
        const password = this.state.password.value.trim();
        if (password.length === 0) {
            return 'Password is required'
        } else if (password.length < 6){
            return 'Password must be at least 6 characters.'
        }
    }

    validateConfirm = () => {
        const password = this.state.password.value.trim();
        const confirm = this.state.confirm.value.trim();
        if(confirm.length === 0) {
            return "You must confirm your password."
        }else if (confirm !== password){
            return 'Password and confirmation do not match.'
        }
    }

    validateEmail = () => {
        const {users} = this.context
        const email = this.state.email.value.trim();
        if (email.length === 0){
            return "You must enter an email."
        }else if (!email.includes(".com") || !email.includes("@")){
            return "Please enter a valid email address"
        } else if(users.find(user => user.email === email)){
            return "Email user already exists"
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        const {setError} = this.context;
        const name = this.state.fullname;
        const pw_hint = this.state.hint;
        const number = this.state.phone;
        const email = this.state.email.value;
        const password= this.state.password.value;
        const newUser = { name, email, number, password, pw_hint }

        fetch(`${config.API_BASE_URL}/api/users`, {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(error => {
                    throw error
                })
            }
            return res.json()
        })
        .then(data => {
            this.context.hideSignUpFxn()
            this.props.history.push(`/userPage/${data.id}`)
        })
        .then(
            this.setState({
                fullname: '', 
                email:{value:''},
                number: '',
                password:{value:''},
                confirm: {value: ''},
                pw_hint: ''
            }))
        .catch(error => {
            setError({error})
        })
    }

    render(){
        const { showSignUp, hideSignUpFxn } = this.context;
        const { fullname, email, phone, password, confirm, hint } = this.state
        const {pathname} = this.props.location;
        const showHideClassName = showSignUp && pathname === '/signup' ? "signup-modal display-block" : "signup-modal display-none";
        const passwordError = this.validatePassword();
        const confirmError = this.validateConfirm();
        const emailError = this.validateEmail();

        return (
            <div className={showHideClassName}>
                <section className="signup-modal">
                    <button type="button" className="signup-close" onClick={hideSignUpFxn}>X</button>
                    <form className="signup-modal-form" onSubmit = {this.handleSubmit}>
                        <h2>Create A New Account</h2>
                        <label htmlFor="fullname">Full Name:</label>
                        <br />
                        <input type="text"name="fullname" id="fullname" value={fullname} onChange={e => this.updateText(e)}/>
                        <br />
                        <label htmlFor="email">Email:</label>
                        <br />
                        <input type="text" name="email" id="email" value={email.value} onChange={e => this.updateTextWithTouch(e)}/>
                        <br />
                        {email.touched && <ValidationError message = {emailError}/>}
                        <br />
                        <label htmlFor="phone">Phone:</label>
                        <br />
                        <input type="text" name="phone" id="phone" value={phone} onChange={e => this.updateText(e)}/>
                        <br />
                        <label htmlFor="password">Password:</label>
                        <br />
                        <input type="text" name="password" id="password" value={password.value} onChange={e => this.updateTextWithTouch(e)}/>
                        <br />
                        {password.touched && <ValidationError message = {passwordError}/>}
                        <br />
                        <label htmlFor="confirm">Confirm password:</label>
                        <br />
                        <input type="text" name="confirm" id="confirm" value={confirm.value} onChange={e => this.updateTextWithTouch(e)}/>
                        <br />
                        {confirm.touched && <ValidationError message = {confirmError}/>}
                        <br />
                        <label htmlFor="hint">Choose a password hint:</label>
                        <br />
                        <input type="text" name="hint" id="hint" value={hint} onChange={e => this.updateText(e)}/>
                        <br />
                        <div className="signup-button-wrapper">
                            <button type="submit" className="sign-up-button">
                                Sign Up
                            </button>
                        </div>
                    </form>
                </section>  
                <div className="complete-overlay" onClick={hideSignUpFxn}>
                </div>
            </div>
        )
    }
}

export default withRouter(SignUpModal)