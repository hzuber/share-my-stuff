import React from 'react';
import './confirm.css'

export default function Confirm(props){
    //reusable confirm pop up
    return (
        <div className = "confirm-div">
            <p>Are you sure?</p>
            <br />
            <button onClick = {props.submit} className="main-btn confirm-btn">Yes</button>
            <button onClick = {props.hide} className="no-btn confirm-btn">Cancel</button>
        </div>
    )
}