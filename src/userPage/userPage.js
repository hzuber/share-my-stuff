import React, { Component } from 'react';
import './userPage.css';
import itemsStore from './itemsStore';
import ItemCard from './itemCard/itemCard'

export default class UserPage extends Component {
    render() {
        const itemsList = itemsStore.map((item, i) => 
            <ItemCard item={item} key={i}/>)

        return (
            <div className="userPage-container">
                <h2 className="welcome-user">
                    Welcome Hannah!
                </h2>
                <ul className="items-bar">
                    <li className="my-items">
                        My Items:
                    </li>
                    <li className="sort">
                        Sort by <i className="fas fa-chevron-down"></i>
                    </li>
                    <li className="add-item">
                        Add Item <i className="fas fa-plus"></i>
                    </li>
                </ul>
                <ul className="items-container">
                    {itemsList}
                </ul>
            </div>
        )
    }
}