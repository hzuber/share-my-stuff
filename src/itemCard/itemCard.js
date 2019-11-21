import React, { Component } from 'react';
import './itemCard.css';
import moment from 'moment'

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
        case "toys":
            icon = "puzzle-piece"
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
            item: props.item,
            name: props.name,
            type: props.type,
            author: props.author,
            description: props.description,
            borrowed: props.borrowed,
            borrowed_by: props.borrowed_by,
            borrowed_since: props.borrowed_since,
            id: props.id
        }
    }

    componentDidUpdate(prevProps){
        const {item, name, type, author, description, borrowed, borrowed_by, borrowed_since, id} = this.state
        if (this.props.id !== prevProps.id){
            this.setState({
                item, name, type, author, description, borrowed, borrowed_by, borrowed_since, id
            })
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


    deleteThisCard = () => {
        const { id } = this.state
        this.unClick();
        this.props.deleteCard(id)
    }

    render() {
        const { name, type, author, borrowed, borrowed_by, borrowed_since} = this.state
        const theDate = moment(borrowed_since).format("DD/MM/YYYY")
        const card = <li className={borrowed ? "borrowed" : null}>
                        {type && generateIcon(type)}
                        <p className="item-name">
                            {name}
                        </p>
                        {type === "Book" && <p className="author">
                            Author: {author}</p>}
                        {borrowed && <p className="borrowed-by">
                            Being borrowed by: {borrowed_by ? borrowed_by : ""}
                            <br/>
                            Borrowed since {theDate}
                        </p>}
                    </li>
        return (
            <>
                {card}
            </>
        )
    }
}

export default ItemCard;