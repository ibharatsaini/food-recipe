import React from 'react'
import Search from '../Header/Search'
import '../styles/banner.css'
function Banner() {
  return (
    <div id='banner'>
        <h2>Find and Add Your Favorite Recipe</h2>
        <div id='cuisine'>
            <span style={{color: '#59871f',backgroundColor: '#f0f5c4'}}>
                Chinese
            </span>
            <span style={{ color:'#3c3a8f',backgroundColor:'#efedfa'}}>
                Indain
            </span >
            <span style={{color: '#1f8787', backgroundColor:'#e5f7f3'}}>
                Italian
            </span>
        </div>
    </div>
  )
}

export default Banner