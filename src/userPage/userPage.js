import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './userPage.css';
import config from '../config';
import {BrowserRouter, Route} from 'react-router-dom';
import ShareContextUserPage from '../shareContextUserPage';
import ItemCard from '../itemCard/itemCard';
import UserSearchBar from '../userSearchBar/userSearchBar';
import AddItem from '../addItem/addItem';
import LargeItemCard from '../largeItemCard/largeItemCard';
import TokenService from '../services/token-service';

export default class UserPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            user: {},
            items: [],
            itemList: [],
            showTypeList: false,
            addItemShowing: false,
            addBookShowing: false,
            typeToAdd: '',
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
        const {items} = this.state;
        this.setState({
            items: [...items, item],
            },
            this.runFilter
        )
    }

    updateEditedItem=(editedItem) => {
        console.log("update edited item ran, with item ", editedItem)
        const itemId = Number(editedItem.id)
        editedItem.id = itemId;
        const newItems = this.state.items.map(item =>
            item.id !== itemId ? item : editedItem)
        this.setState({
            items: newItems
        }, 
        this.runFilter)
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

    showAddBook = () => {
        this.setState({
          addBookShowing: true
        })
    }
    
    hideAddBook = () => {
        this.setState({
          addBookShowing: false
        })
        this.props.history.goBack()
    }

    setTypeToAdd = (type) =>{
        this.setState({
            showTypeList: false,
            addItemShowing: true,
            typeToAdd: type
        })
    }

    showTypeListFxn=()=>{
        this.setState({showTypeList: true})
    }

    hideTypeListFxn=()=>{
        this.setState({showTypeList: false})
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
      console.log("filterItems ran", items)
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
        const userId = (this.props.match.params.user_id)
        console.log(userId)
        Promise.all([
            fetch(`${config.API_BASE_URL}/api/users/${userId}`, {
              headers: {
                'authorization': `basic ${TokenService.getAuthToken()}`,
              },
            }),
            fetch(`${config.API_BASE_URL}/api/users/${userId}/items`, {
              headers: {
                'authorization': `basic ${TokenService.getAuthToken()}`,
              },
            })
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
            typeToAdd: this.state.typeToAdd,
            showTypeList: this.state.showTypeList,
            error: this.state.error,
            addItemShowing: this.state.addItemShowing,
            addBookShowing: this.state.addBookShowing,
            filter: this.state.filter,
            clicked: this.state.cardClicked,
            largeCardShowing: this.state.largeCardShowing,
            editCardShowing: this.state.editCardShowing,
            setError: this.setError,
            updateItems: this.updateItems,
            updateEditedItem: this.updateEditedItem,
            hideAddItem: this.hideAddItem,
            showAddItem: this.showAddItem,
            showAddBook: this.showAddBook,
            hideAddBook: this.hideAddBook,
            handleAddToItems: this.handleAddtoItems,
            handleDeleteItem: this.handleDeleteItem,
            setTypeToAdd: this.setTypeToAdd,
            showTypeListFxn: this.showTypeListFxn,
            hideTypeListFxn: this.hideTypeListFxn,
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
                            {itemList.map((item, i )=> {
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