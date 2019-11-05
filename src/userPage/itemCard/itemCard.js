import React, { Component } from 'react';
import './itemCard.css';

function generateIcon(type) {
    let icon = "star-of-life"
    switch (type.toLowerCase().trim()) {
        case "household":
            icon = "home";
            break;
        case "book":
            icon = "book-open";
            break;
        case "electronics":
            icon = "tv";
            break;
        case "tools":
            icon = "hammer"
            break;
        case "garden":
            icon = "leaf"
            break;
        default:
            break;
    }
    return <i className={`fas fa-${icon}`}></i>
}

class ItemCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            clicked: false,
            largeCardShowing: false,
            editCardShowing: false,
            item: props.item,
            name: props.name,
            type: props.type,
            author: props.author,
            description: props.description,
            borrowed: props.borrowed,
            borrowed_by: props.borrowed_by,
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            clicked: false,
            largeCardShowing: false,
            editCardShowing: false
        })
    }

    clickCard = () => {
        this.setState({
            clicked: true,
            largeCardShowing: true
        })
    }

    unClick = () => {
        this.setState({
            clicked: false,
            largeCardShowing: false,
            editCardShowing: false
        })
    }

    showLargeCard = () => {
        this.setState({
            largeCardShowing: true,
            editCardShowing: false
        })
    }

    showEditCard = () => {
        this.setState({
            editCardShowing: true,
            largeCardShowing: false
        })
        console.log(this.state)
    }

    changeText = (e) => {
        const key = e.target.id
        const val = e.target.value
        this.setState({
             [key]: val 
        })
    }

    markAsBorrowed = (e) => {
        this.setState({
            item:{borrowed: true},
            largeCardShowing: false,
            editCardShowing: true
        })
    }

    markAsReturned = (e) => {
        this.setState({
            item:{borrowed: false}
        })
    }

    render() {
        const { clicked, editCardShowing, largeCardShowing, name, type, author, description, borrowed, borrowed_by} = this.state
        const card = <li className={borrowed ? "borrowed" : null} onClick={this.clickCard}>
            {type && generateIcon(type)}
            <p className="item-name">
                {name}
            </p>
            {type === "Book" && <p className="author">
                Author: {author}</p>}
            {borrowed && <p className="borrowed-by">
                Being borrowed by: {borrowed_by}
            </p>}
        </li>
        const showHideClassName = clicked ? "display-block" : "display-none";
        const largeCard = <div className={showHideClassName}>
            <section className="clicked">
                {largeCardShowing &&
                    <>
                        <i className="fas fa-pencil-alt" onClick={this.showEditCard}></i>
                        <p className="large-name">{name}</p>
                        <p className="large-type">{type}</p>
                        {type === "Book" && <p className="large-author">Author: {author}</p>}
                        <p className="large-description">{description}</p>
                        {!borrowed && <p className="large-being-borrowed">
                            This item is not currently being borrowed</p>}
                        {borrowed && <p className="large-being-borrowed">
                            This item is being borrowed by {borrowed_by}
                        </p>}
                        {!borrowed && <button className="mark-as-borrowed-btn" onClick={this.markAsBorrowed}>Mark as Borrowed</button>}
                        {borrowed && <button className="mark-as-borrowed-btn" onClick={this.markAsReturned}>Mark as Returned</button>}
                    </>
                }
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
            <div className="complete-overlay" onClick={this.unClick}>
            </div>
        </div>
        return (
            <>
                {card}
                {largeCard}
            </>
        )
    }
}

export default ItemCard;