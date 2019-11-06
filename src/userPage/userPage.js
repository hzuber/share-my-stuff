import React, { Component } from 'react';
import './userPage.css';
import itemsStore from './itemsStore';
import ItemCard from './itemCard/itemCard';
import AddItem from './addItem/addItem'

export default class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: itemsStore,
            itemList: itemsStore,
            addItemShowing: false
        }
    }

    handleChange = (e) => {
        this.setState({
            itemList: this.filterItems(e.target.value)
        })
    }

    filterItems = (choice) => {
        const { items } = this.state
        if (choice === "no-filter") {
            return items
        } else if (choice === "borrowed") {
            return items.filter(item => item.borrowed === true)
        } else if (choice === "not-borrowed") {
            return items.filter(item => item.borrowed === false)
        } else {
            return items.filter(item => (item.type || item.borrowed) === choice)
        }
    }

    showAddItem = () => {
        console.log("showAddItem clicked")
        this.setState({
            addItemShowing: true
        })
    }

    hideAddItem = () => {
        this.setState({
            addItemShowing: false
        })
    }

    handleAddItem = (item) => {
        const {itemList} = this.state;
        const newId = itemList.length + 1;
        const newItem = {...item, id:newId};
        const newItemList = [...itemList, newItem];
        this.setState({
            itemList: newItemList,
        })
        console.log("new items are ", this.state.items)
        console.log("new itemList is ", this.state.itemList)
    }

    render() {
        const { itemList, addItemShowing, } = this.state
        const itemTypes = ["Book", "Household", "Garden", "Tools", "Electronics", "Toys"];
        const typeOptions = itemTypes.map(type => <option key={type} value={type} className="sort-options">{type}</option>);
        const showHideAddItem = addItemShowing ? "display-block" : "display-none";
        const addItem = <div className={showHideAddItem}><AddItem pushItem={this.handleAddItem} close={this.hideAddItem}/><div className="complete-overlay" onClick={this.hideAddItem}>
        </div></div>
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
                    <li className="add-item" onClick={() => this.showAddItem()}>
                        Add Item <i className="fas fa-plus"></i>
                    </li>
                </ul>
                {addItem}
                <ul className="items-container">
                    {itemList.map(item => {
                        return (<ItemCard key={item.id} {...item} />)
                    })}
                </ul>
            </div>
        )
    }
}