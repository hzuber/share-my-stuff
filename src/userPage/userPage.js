import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './userPage.css';
import config from '../config';
import {BrowserRouter, Route} from 'react-router-dom';
import ShareContextUserPage from '../shareContextUserPage';
import ItemCard from '../itemCard/itemCard';
import UserSearchBar from '../userSearchBar/userSearchBar';
import AddItem from '../addItem/addItem';
import LargeItemCard from '../largeItemCard/largeItemCard'

export default class UserPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            user: {},
            items: [],
            itemList: [],
            addItemShowing: false,
            filter: 'no-filter',
            cardClicked: false,
            largeCardShowing: false,
            editCardShowing: false,
            error: null
        }
    }
    static defaultProps = {
        match: {
            params: {}
        }
    };

    setError = (error) => {
      this.setState({
        error
      })
    }

    updateItems = (item) => {
        console.log(item)
        const {items} = this.state;
        this.setState({
            items: [...items, item],
            },
            this.runFilter
        )
    }

    showAddItem = () => {
      this.setState({
        addItemShowing: true
      })
    }
  
    hideAddItem = () => {
      this.setState({
        addItemShowing: false
      })
      this.props.history.goBack()
    }
  
    handleDeleteItem = (id) => {
        console.log("delete item id is ", id)
      const { items } = this.state;
      const newList = items.filter(item => Number(item.id) !== Number(id))
      console.log("newList is ", newList)
      this.setState({
        items: newList,
      },
        this.runFilter
      )
    }
  
    handleFilterChange = (e) => {
      this.setState({
        filter: (e.target.value)
      }, this.runFilter)
    }
  
    runFilter = () => {
      this.setState({
        itemList: this.filterItems()
      })
    }
  
    clickCard = () => {console.log("clicked")
      this.setState({
        cardClicked: true,
        largeCardShowing: true
      })
      console.log("card is clicked? ", this.state.cardClicked)
    }
  
    unClick = () => {
      this.setState({
        cardClicked: false,
        largeCardShowing: false,
        editCardShowing: false
      })
    }
  
    showLargeCard = () => {
      this.setState({
        largeCardShowing: true,
        editCardShowing: false
      })
      console.log(this.state.largeCardShowing)
    }
  
    showEditCard = () => {
      this.setState({
        editCardShowing: true,
        largeCardShowing: false
      })
    }
  
    filterItems = () => {
      const { items, filter } = this.state
      if (filter === "no-filter") {
        return items
      } else if (filter === "borrowed") {
        return items.filter(item => item.borrowed === true)
      } else if (filter === "not-borrowed") {
        return items.filter(item => item.borrowed === false)
      } else {
        return items.filter(item => item.type === filter)
      }
    }  

    componentDidMount(){
        console.log("userPage mounted, state is ", this.state)
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
            this.setState({ user, items, itemList: items })
        })
        .catch(error => this.setState({error}))
    }

    render() {
        const contextValue = {
            user: this.state.user,
            items: this.state.itemList,
            error: this.state.error,
            addItemShowing: this.state.addItemShowing,
            filter: this.state.filter,
            clicked: this.state.cardClicked,
            largeCardShowing: this.state.largeCardShowing,
            editCardShowing: this.state.editCardShowing,
            setError: this.setError,
            updateItems: this.updateItems,
            hideAddItem: this.hideAddItem,
            showAddItem: this.showAddItem,
            handleAddToItems: this.handleAddtoItems,
            handleDeleteItem: this.handleDeleteItem,
            handleFilterChange: this.handleFilterChange,
            clickCard: this.clickCard,
            unClick: this.unClick,
            showLargeCard: this.showLargeCard,
            showEditCard: this.state.showEditCard,
            filterItems: this.filterItems
        }
        const { user, itemList } = this.state;
        return (
            <div className="userPage-container">
                <BrowserRouter>
                    <h2 className="welcome-user">
                        Welcome {user.name}!
                    </h2>
                    <ShareContextUserPage.Provider value={contextValue}>
                        <UserSearchBar/>
                        <ul className="items-container">
                            {itemList.map(item => {
                                return (<Link to={`/userPage/${user.id}/${item.id}`} key={item.id} onClick = {this.clickCard}><ItemCard {...item} deleteCard={this.handleDeleteItem}/></Link>)
                            })}
                        </ul>
                        <Route exact path='/userPage/:user_id/:item_id' component={LargeItemCard} />
                        <Route exact path='/userPage/:user_id/addItem' component={AddItem} />
                    </ShareContextUserPage.Provider>
                </BrowserRouter>
            </div>
        )
    }
}