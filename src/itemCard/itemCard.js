import React from 'react';
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

function ItemCard (props) {
    const { name, type, author, borrowed, borrowed_by, borrowed_since} = props
    const theDate = moment(borrowed_since).format("DD/MM/YYYY")
    return( 
        <li className={borrowed ? "borrowed" : null}>
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
    )
}

export default ItemCard;