import React, {Component} from 'react';
import ShareContextUserPage from '../shareContextUserPage';
import config from '../config';
import moment from 'moment';
import './largeItemCard.css';

export default class LargeItemCard extends Component{
    constructor(props){
        super(props)
        this.state = {
            name: '',
            type: '',
            author: '',
            description: '',
            borrowed: false,
            borrowed_by: '',
            borrowed_since: '',
            borrowed_input: false,
            id: 0
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
            //need to control state in the case of patching an edited item.
            this.setState({
                name: res.name,
                type: res.type,
                author: res.author,
                description: res.description,
                borrowed: res.borrowed,
                borrowed_by: res.borrowed_by,
                borrowed_since: moment(res.borrowed_since).format("YYYY-MM-DD"),
                id: Number(res.id)
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
            borrowed_since: moment().format("YYYY-MM-DD")
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
            this.context.updateEditedItem(editedItem);
            this.context.unClick()
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
        const { name, type, author, description, borrowed, borrowed_by, borrowed_since, borrowed_input } = this.state
        const { clicked, largeCardShowing, showEditCard, editCardShowing, showLargeCard, unClick } = this.context;
        const itemTypes = ["Book", "Household", "Garden", "Tools", "Electronics", "Toys"];

        //choose which type to display in the select input
        const otherItems = itemTypes.filter(item => item !== type)
        const editTypeOptions = otherItems.map(t => <option key={t} value={t}>{t}</option>);
        const theDate = moment(borrowed_since).format("DD/MM/YYYY")
        const showHideClassName = clicked ? "display-block" : "display-none";
        //component chooses which elements to display, depeneding whether card is being edited or not, and whether it's a book.
        return (
            <div className={showHideClassName}>
                <section className="clicked modal">
                    {largeCardShowing &&
                        <>
                            <div className="large-card-top-btns">
                                <i className="fas fa-pencil-alt" onClick={showEditCard}></i>
                                <i className="fas fa-trash-alt" onClick={this.deleteItem}></i>
                            </div>
                            <div className="large-card-content">
                                <p className="large-name">{name}</p>
                                <p className="large-type">{type}</p>
                                {type === "Book" && <p className="large-author">Author: {author}</p>}
                                <p className="large-description">{description}</p>
                                {borrowed_input && 
                                    <div className="borrow-input-wrapper">
                                        <p>This item is being borrowed by: </p>
                                        <input type="text" className="borrowed-by-input" name="edit-whos-borrowing" id="borrowed_by" value={borrowed_by} onChange={e => this.markAsBorrowed(e)}/>
                                        <button onClick={this.patchItem} className="confirm-borrower"><i className="far fa-check-circle"></i></button>
                                    </div>}
                                {!borrowed && <p className="large-being-borrowed">
                                    This item is not currently being borrowed</p>}
                                {borrowed && !borrowed_input && <p className="large-being-borrowed">
                                    This item is being borrowed by {borrowed_by}<br />
                                    Borrowed since {theDate}
                                </p>}
                                <div className="large-card-buttons-wrapper">
                                    {!borrowed && !borrowed_input && <button className="mark-as-borrowed-btn main-btn" onClick={this.markAsBorrowed}>Mark as Borrowed</button>}
                                    {borrowed_input && <button className="mark-as-borrowed-btn main-btn" onClick={this.patchItem}>Save</button>}
                                    {borrowed  && <button className="mark-as-borrowed-btn main-btn" onClick={this.markAsReturned}>Mark as Returned</button>}
                                </div>
                            </div>
                        </>
                    }
                    {editCardShowing &&
                        <>
                            <button type="button" className="edit-back" onClick={showLargeCard}>
                                <i className="fas fa-arrow-left"></i>
                            </button>
                            <button type="button" className="edit-item-close close" onClick={unClick}>X</button>
                            <form className="edit-item-form" onSubmit={e => this.handleSubmit(e)}>
                                <h2>Edit Item</h2>
                                <label htmlFor="edit-name">Name:</label>
                                <br />
                                <input type="text" className="edit-name-input" name="edit-name" id="name" value={name} onChange={(e) => this.changeText(e)}/>
                                <br />
                                <label htmlFor="type">Type of item:  </label>
                                <select name="type" className="edit-type" id="type" onChange={e => this.changeText(e)}>
                                    <option value={type} key={type}>{type}</option>
                                    {editTypeOptions}
                                </select>
                                <br />
                                {type === "Book" && <>
                                    <label htmlFor="author">Author:</label>
                                    <br />
                                    <input type="author" name="author" id="author" value={author} onChange={e => this.changeText(e)} />
                                </>}
                                <br />
                                <div className="edit-description-div">
                                    <label htmlFor="description">Description:</label>
                                    <br />
                                    <textarea rows="3" cols="50" className="edit-description" name="description" id="description" value={description} onChange={e => this.changeText(e)}/>
                                    <br />
                                </div>
                                {borrowed && <>
                                    <label htmlFor="edit-whos-borrowing">Being borrowed by: </label>
                                    <br />
                                    <input type="text" className="edit-borrowed-by" name="edit-whos-borrowing" id="borrowed_by" value={borrowed_by} onChange={e => this.changeText(e)}/>
                                    <br />
                                    <label htmlFor="edit-borrowing-from when">Borrowed since: </label>
                                    <br />
                                    <input type="date" className="borrowed_from_when" name="borrowed_from_when" id="borrowed_since" value={borrowed_since} onChange={e => this.changeText(e)} />
                                    <br />
                                </>}
                                <div className="signup-button-wrapper">
                                    <button type="submit" className="save-edit-button main-btn">
                                        Save
                                    </button>
                                </div>
                            </form>
                        </>
                    }
                </section>
                <div className="complete-overlay" onClick={() => this.patchItem()}>
                </div>
            </div>
        )
    }
}