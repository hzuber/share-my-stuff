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
        const { user } = this.context;
        const { handleFilterChange, showAddItem } = this.context
        const itemTypes = ["Book", "Household", "Garden", "Tools", "Electronics", "Toys"];
        const typeOptions = itemTypes.map(type => <option key={type} value={type} className="sort-options">{type}</option>);
        return(
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
                <Link to={`/userPage/${user.id}/addItem`}>
                    <li className="add-item" onClick={showAddItem}>
                        Add Item <i className="fas fa-plus"></i>
                    </li>
                </Link>
            </ul>
        )
    }
}

export default UserSearchBar;