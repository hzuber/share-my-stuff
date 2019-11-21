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
        const { user, handleFilterChange, setTypeToAdd, showTypeList, showTypeListFxn, hideTypeListFxn } = this.context
        const showHideTypeList = showTypeList ? "display-block" : "display-none";
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
                    </li>
                    <li className="add-item" onClick={showTypeListFxn}>
                        Add Item <i className="fas fa-plus"></i>
                    </li>
                </ul>
                <div className = {showHideTypeList}>
                    <ul className="type-list">
                        {addItemList}
                    </ul>
                    <div className="complete-overlay" onClick={hideTypeListFxn}></div>
                </div>
            </>
        )
    }
}

export default UserSearchBar;