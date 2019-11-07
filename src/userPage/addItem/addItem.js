import React, { Component } from 'react';
import './addItem.css';
import moment from 'moment'

export default class AddItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            type: "",
            author: "",
            description: "",
            borrowed: false,
            borrowed_by: "",
            borrowed_since: ""
        }
    }
    
    changeState = (e) => {
        const key = e.target.id;
        const val = e.target.value;
        if(key === "borrowed"){
            if (val === "true"){
                this.setState({
                    borrowed: true
                })
            } else {
                this.setState({
                    borrowed: false
                })
            }
        } else {
            this.setState({
                [key]: val 
            })
        }
        console.log(this.state.borrowed_since)
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        const { name, type, author, description, borrowed, borrowed_by, borrowed_since } =this.state;
        const date = moment(borrowed_since, ["DD/MM/YYYY", moment.ISO_8601])
        console.log(date)
        const newItem = { name, type, author, description, borrowed, borrowed_by, borrowed_since: date }
        console.log(newItem)
        this.props.pushItem(newItem);
        this.setState({
            name: "",
            type: "",
            author: "",
            description: "",
            borrowed: false,
            borrowed_by: "",
            borrowed_since: ""
        })
    }

    render() {
        const {name, type, author, description, borrowed, borrowed_by, borrowed_since} = this.state;
        return (
            <section className="add-item-container">
                <button type="button" className="add-item-close" onClick={this.props.close}>X</button>
                <form className="add-item-form" onSubmit={e => this.handleSubmit(e)}>
                    <h2>Add Item</h2>
                    <label htmlFor="add-name">Name:</label>
                    <br />
                    <input type="text" className="add-name-input" name="add-name" id="name" value={name} onChange={(e) => this.changeState(e)} />
                    <br />
                    <label htmlFor="type">Type of item:  </label>
                    <select name="type" className="add-type" id="type" value={this.state.type} onChange={e => this.changeState(e)}>
                        <option value="">Choose a type</option>
                        <option value="Household">Household</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Book">Book</option>
                        <option value="Garden">Garden</option>
                        <option value="Tools">Tools</option>
                    </select>
                    <br />
                    {type === "Book" && <div className="add-item-author-div">
                        <label htmlFor="author" className="add-item-author-div">Author:</label>
                        <br />
                        <input type="author" className="add-item-author" name="author" id="author" value={author} onChange={e => this.changeState(e)} />
                    </div>}
                    <br />
                    <label htmlFor="radio-borrowed">Is this item currently being borrowed? </label>
                        <div className="radio-btns">
                            <><input type="radio" name="radio-borrowed"  id="borrowed" value="true" checked={borrowed===true} onChange={e => this.changeState(e)}/>Yes</>
                            <><input type="radio" name="radio-borrowed" id="borrowed" value="false" checked={borrowed===false} onChange={e => this.changeState(e)}/>No</>
                        </div>
                    {borrowed && <>
                        <label htmlFor="add-whos-borrowing">Being borrowed by: </label>
                        <br />
                        <input type="text" className="add-borrowed-by" name="add-whos-borrowing" id="borrowed_by" value={borrowed_by} onChange={e => this.changeState(e)} />
                        <br />
                        <label htmlFor="borrowed_from_when">Borrowed since: </label>
                        <br />
                        <input type="datetime-local" step="1" className="borrowed_from_when" name="borrowed_from_when" id="borrowed_since" value={borrowed_since} onChange={e => this.changeState(e)} />
                        <br />
                    </>}
                    <label htmlFor="description">Description:</label>
                    <br />
                    <textarea rows="4" cols="50" className="add-description" name="description" id="description" value={description} onChange={e => this.changeState(e)} />
                    <br />
                    <div className="add-item-btn-wrapper">
                        <button type="submit" className="save-add-button" id="save-and-close" onClick={this.props.close}>
                            Save
                        </button>
                        <button type="submit" className="save-add-button" id="save-and-add-another">
                            Save And Add Another 
                        </button>
                    </div>
                </form>
            </section>
        )
    }
}