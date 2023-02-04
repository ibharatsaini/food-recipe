import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/dish.css"
function Dish({image,fullName,cuisine,link,edit=false}) {
  return (
    <Link to={`/recipe/${link}`} className="dish">
        <div className='imgDish'>
            <img src={image} />
        </div>
        <h3>{fullName}</h3>
        <span>{cuisine}</span>
        {edit && <Link to={`/edit/${link}`} /> }
    </Link>
  )
}

export default Dish
