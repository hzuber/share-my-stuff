import React, {Component} from 'react';
import './userSearchBar.css';
import ShareContextUserPage from '../shareContextUserPage';
import {Link} from 'react-router-dom';

class UserSearchBar extends Component{
    static contextType = ShareContextUserPage;
    static defaultProps = {
        match: {
            params: {}
        }
    };

    render(){
        const { user, handleFilterChange, setTypeToAdd, showTypeList, showTypeListFxn, hideTypeListFxn, allItems } = this.context
        const noItemsSort = allItems.length === 0 ? "display-none" : "sort-box";
        const showHideTypeList = showTypeList ? "display-block type-list" : "hide-type-list";
        const showHideOverlay = showTypeList ? "complete-overlay-invisible" : "display-none";
        const itemTypes = ["Book", "Household", "Garden", "Tools", "Electronics", "Toys"];
        const typeOptions = itemTypes.map(type => <option key={type} value={type} className="sort-options">{type}</option>);
        const addItemList = itemTypes.map(type => 
                                                <Link to={`/userPage/${user.id}/addItem`} key={type}>
                                                    <li className="add-item item-list-li" data-tag={type} onClick={e => setTypeToAdd(e.currentTarget.dataset.tag)}>
                                                        {type}
                                                    </li>
                                                </Link>)
        return(
            <>
                <ul className="items-bar">
                    <li className="my-items">
                        My Items:
                    </li>
                    <li className="sort">
                        <div className={noItemsSort}>
                            Sort by:
                            <select name="type" className="sort-by-type" id="type" onChange={handleFilterChange}>
                                <option value="no-filter">See all</option>
                                <optgroup label="Status">
                                    <option value="not-borrowed">Not Borrowed</option>
                                    <option value="borrowed">Borrowed</option>
                                </optgroup>
                                <optgroup label="Sort By Type">
                                    {typeOptions}
                                </optgroup>
                            </select>
                        </div>
                    </li>
                    <li className="add-item" onClick={showTypeListFxn}>
                        <p className="add-item-text">Add Item </p><i className="fas fa-plus"></i>
                    </li>
                </ul>
                <ul className={showHideTypeList}>
                    {addItemList}
                </ul>
                <div className={showHideOverlay} onClick={hideTypeListFxn}></div>
            </>
        )
    }
}

export default UserSearchBar;