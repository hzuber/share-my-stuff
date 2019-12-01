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
import NavBar from '../navBar/navBar'

export default class UserPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            user: {},
            items: [],
            itemList: [],
            prevScrollpos: window.pageYOffset,
            navBarVisible: true,
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

    handleAddToItems = (item) => {
        const {items} = this.state;
        this.setState({
            items: [...items, item],
            },
            this.runFilter
        )
    }

    showAddItem = () => {
      this.setState({
        addItemShowing: true,
        largeCardShowing: false
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
        this.state.showTypeList ? 
          this.setState({showTypeList: false}) : 
          this.setState({showTypeList: true})
    }

    hideTypeListFxn=()=>{
        this.setState({showTypeList: false})
    }
  
    handleDeleteItem = (id) => {
      const { items } = this.state;
      const newList = items.filter(item => Number(item.id) !== Number(id))
      this.setState({
        items: newList,
      },
        this.runFilter
      )
    }

    updateEditedItem=(editedItem) => {
      const newItems = this.state.items.map(item =>
          item.id === editedItem.id ? editedItem : item)
      this.setState({
          items: newItems
      }, 
      this.runFilter)
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
  
    clickCard = () => {
      this.setState({
        cardClicked: true,
        largeCardShowing: true
      })
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

    handleScroll = () => {
      const { prevScrollpos } = this.state;
  
      const currentScrollPos = window.pageYOffset;
      const navBarVisible = prevScrollpos > currentScrollPos;
  
      this.setState({
        prevScrollpos: currentScrollPos,
        navBarVisible
      });
    };

    componentDidMount(){
      window.addEventListener("scroll", this.handleScroll);
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

    componentWillUnmount() {
      window.removeEventListener("scroll", this.handleScroll);
    }

    render() {
        const contextValue = {
            user: this.state.user,
            items: this.state.itemList,
            allItems: this.state.items,
            navBarVisible: this.state.navBarVisible,
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
            hideAddItem: this.hideAddItem,
            showAddItem: this.showAddItem,
            showAddBook: this.showAddBook,
            hideAddBook: this.hideAddBook,
            handleAddToItems: this.handleAddToItems,
            handleDeleteItem: this.handleDeleteItem,
            updateEditedItem: this.updateEditedItem,
            setTypeToAdd: this.setTypeToAdd,
            showTypeListFxn: this.showTypeListFxn,
            hideTypeListFxn: this.hideTypeListFxn,
            handleFilterChange: this.handleFilterChange,
            clickCard: this.clickCard,
            unClick: this.unClick,
            showLargeCard: this.showLargeCard,
            showEditCard: this.showEditCard,
            filterItems: this.filterItems
        }
        const { user, itemList, items, navBarVisible } = this.state;
        const noItemsAtAll = items.length === 0 ? "no-items display-block" : "display-none"
        const hideNavBar = navBarVisible ? "App-header" : "App-header-hide"
        const hideSearchBar = navBarVisible ? "search-bar" : "search-bar-hide"
        const scrollItemsContainer = navBarVisible ? "items-container" : "items-container scroll"
        const noFilteredItems = items.length > 0 && itemList.length === 0 ? "no-items display-block" : "display-none"
        const startNoItems = <h3>
                              You haven't added any items yet. Click on Add Item to get started.
                            </h3>
        return (
            <div className="userPage-container">
                <BrowserRouter>
                  <ShareContextUserPage.Provider value={contextValue}>
                    <header className={hideNavBar}>
                      <NavBar />
                    </header>
                    <div  className={hideSearchBar}>
                      <UserSearchBar/>
                    </div>
                      <ul className={scrollItemsContainer}>
                        <div className = {noItemsAtAll}>{startNoItems}</div>
                        <div className = {noFilteredItems}><h3>There are no items to display.</h3></div>
                          {itemList.map(item => {
                              return (<Link to={`/userPage/${user.id}/item/${item.id}`} key={item.id} onClick = {this.clickCard} className="item-card"><ItemCard {...item}/></Link>)
                          })}
                          <Route exact path='/userPage/:user_id/addItem' component={AddItem} />
                          <Route exact path='/userPage/:user_id/item/:item_id' component={LargeItemCard} />
                      </ul>
                    </ShareContextUserPage.Provider>
                </BrowserRouter>
            </div>
        )
    }
}