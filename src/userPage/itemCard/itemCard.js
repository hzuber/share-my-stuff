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
            editCardShowing: false
        }
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

    render() {
        const { item } = this.props;
        const card = <li className={item.borrowed ? "borrowed" : null} onClick={this.clickCard}>
                        {generateIcon(item.type)}
                        <p className="item-name">
                            {item.name}
                        </p>
                        {item.type === "Book" && <p className="author">
                            Author: {item.author}</p>}
                        {item.borrowed && <p className="borrowed-by">
                            Item being borrowed by: {item.borrowed_by}
                        </p>}
                    </li>
        const showHideClassName = this.state.clicked ? "display-block" : "display-none";
        const largeCard =   <div className={showHideClassName}>
                                <section className="clicked">
                                    {this.state.largeCardShowing &&
                                    <>
                                    <i className="fas fa-pencil-alt" onClick={this.showEditCard}></i>
                                    <p className="large-name">{item.name}</p>
                                    <p className="large-type">{item.type}</p>
                                    {item.type === "Book" && <p className="large-author">Author: {item.author}</p>}
                                    <p className="large-description">{item.description}</p>
                                    {!item.borrowed && <p className="large-being-borrowed">
                                        This item is not currently being borrowed</p>}
                                    {item.borrowed && <p className="large-being-borrowed">
                                        This item is being borrowed by {item.borrowed_by}
                                    </p>}
                                    <button className="mark-as-borrowed-btn">Mark as Borrowed</button>
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