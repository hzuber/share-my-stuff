import React, {Component} from 'react';
import ShareContextUserPage from '../shareContextUserPage';
import config from '../config';
import moment from 'moment'

export default class EditItemCard extends Component{
    constructor(props){
        super(props)
        const itemId = Number(this.props.match.params.item_id)
        this.state = {
            name: '',
            type: '',
            author: '',
            description: '',
            borrowed: false,
            borrowed_by: '',
            borrowed_since: '',
            borrowed_input: false,
            id: itemId
        }
    }
    static contextType = ShareContextUserPage;
    static defaultProps = {
        match: {
            params: {}
        }
    };

    componentDidMount(){
        const itemId = this.props.match.params.item_id;
        fetch(`${config.API_BASE_URL}/api/items/${itemId}`, {
            method: 'GET'
        })
        .then(res => (res.ok ? res: Promise.reject(res)))    
        .then(res => res.json())
        .then(res => {
            this.setState({
                name: res.name,
                type: res.type,
                author: res.author,
                description: res.description,
                borrowed: res.borrowed,
                borrowed_by: res.borrowed_by,
                borrowed_since: res.borrowed_since,
                id: itemId
            })
        })
        .catch(error => {
            this.setState({ error })
        })
    }

    changeText = (e) => {
        const key = e.target.id
        const val = e.target.value
        this.setState({
             [key]: val, 
        })
    }

    markAsBorrowed = (e) => {
        this.setState({
            borrowed: true,
            borrowed_input: true,
            borrowed_by: e.target.value,
            borrowed_since: moment()
        })
    }

    markAsReturned = () => {
        this.setState({
            borrowed: false,
            borrowed_input: false
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.patchItem()
    }

    patchItem = () => {
        const { name, type, author, description, borrowed, borrowed_by, borrowed_since, id } = this.state;
        const editedItem = { name, type, author, description, borrowed, borrowed_by, borrowed_since, id };
        const userId = this.props.match.params.user_id;

        fetch(`${config.API_BASE_URL}/api/items/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(editedItem),
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                return res.then(error => {
                    throw error
                })
            }
        })
        .then(() => {
            this.setState({
                name: '',
                type: '',
                author: '',
                description: '',
                borrowed: false,
                borrowed_by: '',
                borrowed_since: '',
                borrowed_input: false
            })
        })
        .then(() => {
            this.context.updateEditedItem(editedItem)
        })
        .then(() => {
            this.props.history.push(`/userPage/${userId}`)
        })
        .catch(error => this.context.setError({error}))
    }

    deleteItem = () => {
        const itemId = this.props.match.params.item_id;
        const userId = this.props.match.params.user_id;

        fetch(`${config.API_BASE_URL}/api/items/${itemId}`, {
            method: 'DELETE'
        })
        .then(res => {
            if (!res.ok) {
                return res.then(error => {
                    throw error
                })
            }
        })
        .then(() => {
            this.props.history.push(`/userPage/${userId}`);
            this.context.handleDeleteItem(itemId);
        })
        .catch(error => this.context.setError({error}));
    }

    render(){
        const { name, type, author, description, borrowed, borrowed_by, borrowed_since } = this.state
        const { clicked, editCardShowing } = this.context;
        const showHideClassName = clicked ? "display-block" : "display-none";
        const userId = this.props.match.params.user_id
        return (
            <div className={showHideClassName}>
                <section className="clicked">
                    {editCardShowing &&
                        <>
                            <button type="button" className="edit-back" onClick={this.showLargeCard}>
                                <i className="fas fa-arrow-left"></i>
                            </button>
                            <form className="edit-item-form" onSubmit={e => this.handleSubmit(e)}>
                                <h2>Edit Item</h2>
                                <label htmlFor="edit-name">Name:</label>
                                <br />
                                <input type="text" className="edit-name-input" name="edit-name" id="name" value={name} onChange={(e) => this.changeText(e)}/>
                                <br />
                                <label htmlFor="type">Type of item:  </label>
                                <select name="type" className="edit-type" id="type" onChange={e => this.changeText(e)}>
                                    <option value={type}>Household</option>
                                    <option value={type}>Electronics</option>
                                    <option value={type}>Book</option>
                                    <option value={type}>Garden</option>
                                    <option value={type}>Tools</option>
                                </select>
                                <br />
                                {type === "Book" && <>
                                    <label htmlFor="author">Author:</label>
                                    <br />
                                    <input type="author" name="author" id="author" value={author} onChange={e => this.changeText(e)} />
                                </>}
                                <br />
                                {borrowed && <>
                                    <label htmlFor="edit-whos-borrowing">Being borrowed by: </label>
                                    <br />
                                    <input type="text" className="edit-borrowed-by" name="edit-whos-borrowing" id="borrowed_by" value={borrowed_by} onChange={e => this.changeText(e)}/>
                                    <br />
                                    <label htmlFor="edit-borrowing-from when">Borrowed since: </label>
                                    <br />
                                    <input type="text" className="borrowed_from_when" name="borrowed_from_when" id="borrowed_since" value={borrowed_since} onChange={e => this.changeState(e)} />
                                    <br />
                                </>}
                                <label htmlFor="description">Description:</label>
                                <br />
                                <textarea rows="4" cols="50" className="edit-description" name="description" id="description" value={description} onChange={e => this.changeText(e)}/>
                                <br />
                                <div className="signup-button-wrapper">
                                    <button type="submit" className="save-edit-button">
                                        Save
                                    </button>
                                </div>
                            </form>
                        </>
                    }
                </section>
                <div className="complete-overlay" onClick={this.props.history.push(`/userPage/${userId}`)}>
                </div>
            </div>
        )
    }
}