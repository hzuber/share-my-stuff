import React from 'react'

//generate the font awesome icons for different item types
export default function generateIcon(type) {
    let icon = "star-of-life"
    switch (type.toLowerCase().trim()) {
        case "household":
            icon = "home";
            break;
        case "book":
            icon = "book-open";
            break;
        case "electronics":
            icon = "tv";
            break;
        case "tools":
            icon = "hammer"
            break;
        case "garden":
            icon = "leaf"
            break;
        case "toys":
            icon = "puzzle-piece"
            break;
        default:
            break;
    }
    return <i className={`fas fa-${icon}`}></i>
}