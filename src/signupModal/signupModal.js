import React, {Component} from 'react'; 
import ShareContextMain from '../shareContextMain';
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
            confirm: {touched:false, value: ''}
        }
    }
    static contextType = ShareContextMain;

    //updates state based on what user has typed
    updateText = (e) => {
        const key = e.target.id;
        const value = e.target.value;
        this.setState({
            [key]: value
        })
    }
    //updates state of required fields
    updateTextWithTouch = (e) => {
        const key = e.target.id;
        const value = e.target.value;
        this.setState({
            [key]:{touched: true, value}
        })
    }

//ensure password is the correct length
    validatePassword = () => {
        const password = this.state.password.value.trim();
        if (password.length === 0) {
            return 'Password is required'
        } else if (password.length < 6){
            return 'Password must be at least 6 characters.'
        }
    }

//matches password and confirm password fields
    validateConfirm = () => {
        const password = this.state.password.value.trim();
        const confirm = this.state.confirm.value.trim();
        if(confirm.length === 0) {
            return "You must confirm your password."
        }else if (confirm !== password){
            return 'Password and confirmation do not match.'
        }
    }
//checks that input conforms with standard email address
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
        const number = this.state.phone;
        const email = this.state.email.value;
        const password= this.state.password.value;
        const newUser = { name, email, number, password}

        //adds user to the database
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
                confirm: {value: ''}
            }))
        .catch(error => {
            setError({error})
        })
    }

    render(){
        const { showSignUp, hideSignUpFxn } = this.context;
        const { fullname, email, phone, password, confirm } = this.state
        const {pathname} = this.props.location;
        //only show signup modal if path is /signup
        const showHideClassName = showSignUp && pathname === '/signup' ? "signup-modal display-block" : "signup-modal display-none";

        //if validated input is incorrect show corresponding error
        const passwordError = this.validatePassword();
        const confirmError = this.validateConfirm();
        const emailError = this.validateEmail();

        return (
            <div className={showHideClassName}>
                <section className="signup-modal modal">
                    <button type="button" className="signup-close close" onClick={hideSignUpFxn}>X</button>
                    <form className="signup-modal-form" onSubmit = {this.handleSubmit}>
                        <h2>Create A New Account</h2>
                        <label htmlFor="fullname">Full Name<span className="optional">-   optional</span></label>
                        <br />
                        <input type="text"name="fullname" id="fullname" value={fullname} onChange={e => this.updateText(e)}/>
                        <br />
                        <label htmlFor="email">Email</label>
                        <br />
                        <input type="text" name="email" id="email" value={email.value} onChange={e => this.updateTextWithTouch(e)}/>
                        <br />
                        {email.touched && <ValidationError message = {emailError}/>}
                        <br />
                        <label htmlFor="phone">Phone<span className="optional">-   optional</span></label>
                        <br />
                        <input type="text" name="phone" id="phone" value={phone} placeholder="215-555-5555" onChange={e => this.updateText(e)}/>
                        <br />
                        <label htmlFor="password">Password</label>
                        <br />
                        <input type="password" name="password" id="password" value={password.value} onChange={e => this.updateTextWithTouch(e)}/>
                        <br />
                        {password.touched && <ValidationError message = {passwordError}/>}
                        <br />
                        <label htmlFor="confirm">Confirm password</label>
                        <br />
                        <input type="password" name="confirm" id="confirm" value={confirm.value} onChange={e => this.updateTextWithTouch(e)}/>
                        <br />
                        {confirm.touched && <ValidationError message = {confirmError}/>}
                        <br />
                        <div className="signup-button-wrapper">
                            <button type="submit" className="sign-up-button main-btn">
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

export default SignUpModal;