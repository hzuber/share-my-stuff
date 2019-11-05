import React, { Component } from 'react';
import './userPage.css';
import itemsStore from './itemsStore';
import ItemCard from './itemCard/itemCard'

export default class UserPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            items: itemsStore,
            filter: "no-filter"
        }
    }

    handleChange = (e) => {
        this.setState({
            filter: e.target.value
        })
        console.log(this.state)
    }

    filterByType(){
        console.log(this.state)
        const {filter, items} = this.state
        const filteredItems = items.filter(item => item.type === filter)
        return filteredItems;
    }

    filterByBorrowed(){
        console.log(this.state)
        const {filter, items} = this.state
        const filteredItems = filter === "borrowed" ? items.filter(item => item.borrowed === true) : items.filter(item => item.borrowed === false)
        return filteredItems
    }

    render() {
        const { filter, items } = this.state
        const filteredItems = filter === "no-filter" ? items : filter === "not-borrowed" || filter === "borrowed" ? this.filterByBorrowed() : this.filterByType();
        const itemList = filteredItems.map(item => 
                                                <ItemCard item={item} /> )
        const itemTypes = ["Book", "Household", "Garden", "Tools", "Electronics", "Toys"];
        const typeOptions = itemTypes.map(type => <option key={type} value={type} className="sort-options">{type}</option>)
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
                        Sort by:    
                        <select name="type" className="sort-by-type" id="type" onChange={this.handleChange}>
                            <option value="no-filter">See all</option>
                            <optgroup label="Status">
                                <option value="not-borrowed">Not Borrowed</option>
                                <option value="borrowed">Borrowed</option>
                            </optgroup>
                            <optgroup label="Sort By Type">
                                {typeOptions}
                            </optgroup>
                        </select>
                    </li>
                    <li className="add-item">
                        Add Item <i className="fas fa-plus"></i>
                    </li>
                </ul>
                <ul className="items-container">
                    {itemList}
                </ul>
            </div>
        )
    }
}