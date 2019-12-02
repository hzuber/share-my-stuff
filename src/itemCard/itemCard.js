import React from 'react';
import './itemCard.css';
import moment from 'moment'
import generateIcon from "../generateIcon"

function ItemCard (props) {
    const { name, type, author, borrowed, borrowed_by, borrowed_since} = props
    const theDate = moment(borrowed_since).format("DD/MM/YYYY")
    //generates a border if item is borrowed, shows author if the item type is Book.
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