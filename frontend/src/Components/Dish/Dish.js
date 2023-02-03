import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/dish.css"
function Dish({image,fullName,cuisine,link}) {
  return (
    <Link to={`/recipe/${link}`} className="dish">
        <div className='imgDish'>
            <img src={image} />
        </div>
        <h3>{fullName}</h3>
        <span>{cuisine}</span>
    </Link>
  )
}

export default Dish
