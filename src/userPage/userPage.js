import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './userPage.css';
import config from '../config'
import ShareContext from '../shareContext';
import ItemCard from '../itemCard/itemCard';
import UserSearchBar from '../userSearchBar/userSearchBar';

export default class UserPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            user: {},
            items: [],
        }
    }
    static contextType = ShareContext;
    static defaultProps = {
        match: {
            params: {}
        }
    };

    updateItems = (item) => {
        console.log(item)
        const {items} = this.state;
        const newId = items.length + 1;
        const newItem = {...item, id:newId};
        this.setState({
            items: [...items, newItem],
            },
            this.runFilter
        )
    }

    componentDidMount(){
        const userId = (this.props.match.params.user_id)
        Promise.all([
            fetch(`${config.API_BASE_URL}/api/users/${userId}`),
            fetch(`${config.API_BASE_URL}/api/users/${userId}/items`)
        ])
        .then(([userRes, itemRes]) => {
            if(!userRes.ok)
                return userRes.json().then(e => Promise.reject(e));
            if(!itemRes.ok)
                return itemRes.json().then(e => Promise.reject(e))

            return Promise.all([userRes.json(), itemRes.json()])
        })
        .then(([user, items]) => {
            this.setState({ user, items })
        })
        .catch(error => this.context.setError({error}))
    }

    render() {
        const userId = (this.props.match.params.user_id)
        const {  handleDeleteItem, } = this.context;
        const { user, items } = this.state;
        return (
            <div className="userPage-container">
                <h2 className="welcome-user">
                    Welcome {user.name}!
                </h2>
                <UserSearchBar userId = {userId}/>
                <ul className="items-container">
                    {items.map(item => {
                        return (<Link to={`/userPage/${userId}/${item.id}`} key={item.id}><ItemCard {...item} deleteCard={handleDeleteItem}/></Link>)
                    })}
                </ul>
            </div>
        )
    }
}