import React, { Component } from 'react';
import './userPage.css';
import itemsStore from './itemsStore';
import ItemCard from './itemCard/itemCard'

export default class UserPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            items: itemsStore,
            itemList: itemsStore
        }
    }

    handleChange = (e) => {
        this.setState({
            itemList: this.filterItems(e.target.value)
        })
    }
 
    filterItems = (choice) => {
        const {items} = this.state
        if(choice === "no-filter") {
            return items
        } else if(choice === "borrowed"){
            return items.filter(item => item.borrowed === true)
        } else if(choice === "not-borrowed"){
            return items.filter(item => item.borrowed === false)
        }else {
            return items.filter(item => (item.type || item.borrowed) === choice)
        }
    }

    render() {
        const { itemList} = this.state
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
                    {itemList.map((item,i) => {
                        return(<ItemCard key={i} {...item} />)
                    })}
                </ul>
            </div>
        )
    }
}