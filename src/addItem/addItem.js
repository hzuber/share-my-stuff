import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import './addItem.css';
import moment from 'moment';
import ShareContextUserPage from '../shareContextUserPage';
import config from '../config'

class AddItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            type: "",
            author: "",
            description: "",
            borrowed: false,
            borrowed_by: "",
            borrowed_since: ""
        }
    }
    static contextType = ShareContextUserPage;
    static defaultProps = {
        match: {
            params: {}
        },
        userId: 0
    };
//get item type from drop down menu in userSearchBar
    componentDidMount(){
        const type = this.context.typeToAdd
        this.setState({
            type
        })
    }
//change state based on input    
    changeState = (e) => {
        const key = e.target.id;
        const val = e.target.value;
        if(key === "borrowed"){
            if (val === "true"){
                this.setState({
                    borrowed: true,
                    borrowed_since: moment().format("YYYY-MM-DD")
                })
            } else {
                this.setState({
                    borrowed: false
                })
            }
        } else {
            this.setState({
                [key]: val 
            })
        }
    }
//post new item
    handleSubmit=(e)=>{
        e.preventDefault()
        const userId = this.props.match.params.user_id;
        const { name, type, author, description, borrowed, borrowed_by, borrowed_since } = this.state;

        //translate date input to moment
        const date = borrowed_since === "" ? null : moment(borrowed_since,"YYYY-MM-DD")
        const validateDate = !date ? null : !date.isValid() ? moment().format('DD/MM/YYYY') : date
        const newItem = { name, type, author, description, borrowed, borrowed_by, borrowed_since: validateDate, owned_by: userId }
        
        fetch(`${config.API_BASE_URL}/api/items`, {
            method: 'POST',
            body: JSON.stringify(newItem),
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
        //set all fields to blank, add new items to items in context
        .then((data) => {
            this.setState({
                name: "",
                type: "",
                author: "",
                description: "",
                borrowed: false,
                borrowed_by: "",
                borrowed_since: ""
            })
            this.context.handleAddToItems(data);
        })
        .then(() => {
            this.props.history.push(`/userPage/${userId}`);
        })
        .catch(error => this.context.setError({error}))
    }

    render() {
        const {name, type, author, description, borrowed, borrowed_by, borrowed_since} = this.state;
        const { addItemShowing, hideAddItem, typeToAdd } = this.context;
        const itemTypes = ["Book", "Household", "Garden", "Tools", "Electronics", "Toys"];

        //choose which type to display in the select input
        const otherItems = itemTypes.filter(item => item !== this.context.typeToAdd)
        const typeOptions = otherItems.map(type => <option key={type} value={type}>{type}</option>);
        
        //displays modal only if it is required by context
        const showHideAddItem = addItemShowing ? "display-block" : "display-none";
        return (
            <div className={showHideAddItem}>
                <Router>
                <section className="add-item-container modal">
                    <button type="button" className="add-item-close close" onClick={hideAddItem}>X</button>
                    <form className="add-item-form" onSubmit={this.handleSubmit}>
                        <h2>Add Item</h2>
                        <label htmlFor="add-name">Name:</label>
                        <br />
                        <input autoFocus type="text" className="add-name-input" name="add-name" id="name" value={name} onChange={(e) => this.changeState(e)} />
                        <br />
                        <label htmlFor="type">Type of item:  </label>
                        <select name="type" className="add-type" id="type" value={this.state.type} onChange={e => this.changeState(e)}>
                            <option value="">{typeToAdd}</option>
                            {typeOptions}
                        </select>
                        <br />
                        {type === "Book" && <div className="add-item-author-div">
                            <label htmlFor="author" className="add-item-author-div">Author:</label>
                            <br />
                            <input type="author" className="add-item-author" name="author" id="author" value={author} onChange={e => this.changeState(e)} />
                        </div>}
                        <br />
                        <div className = "add-description-div">
                            <label htmlFor="description">Description:</label>
                            <br />
                            <textarea rows="3" cols="50" className="add-description" name="description" id="description" value={description} onChange={e => this.changeState(e)} />
                            <br />
                        </div>
                        <label htmlFor="radio-borrowed">Is this item currently being borrowed? </label>
                        <div className="radio-btns">
                            <><input type="radio" name="radio-borrowed"  id="borrowed" value="true" checked={borrowed===true} onChange={e => this.changeState(e)}/>Yes</>
                            <><input type="radio" name="radio-borrowed" id="borrowed" value="false" checked={borrowed===false} onChange={e => this.changeState(e)}/>No</>
                        </div>
                        {borrowed && <>
                            <label htmlFor="add-whos-borrowing">Being borrowed by: </label>
                            <br />
                            <input type="text" className="add-borrowed-by" name="add-whos-borrowing" id="borrowed_by" value={borrowed_by} onChange={e => this.changeState(e)} />
                            <br />
                            <label htmlFor="borrowed_from_when">Borrowed since: </label>
                            <br />
                            <input type="date" className="borrowed_from_when" name="borrowed_from_when" id="borrowed_since" value={borrowed_since} onChange={e => this.changeState(e)} />
                            <br />
                        </>}
                        <div className="add-item-btn-wrapper">
                            <button type="submit" className="save-add-button main-btn" id="save-and-close">
                                Save
                            </button>
                        </div>
                    </form>
                </section>
            <div className="complete-overlay" onClick={hideAddItem}></div>
            </Router>
            </div>
        )
    }
}

export default AddItem;