import React from 'react'
import Banner from '../Banner/Banner'
import Dish from '../Dish/Dish'
import '../styles/home.css'


function Home() {
  return (
    <>
        <Banner />
        <div className='listed'>
            <Dish image={`https://www.themealdb.com/images/media/meals/xrysxr1483568462.jpg`}
                   cuisine={'chinese'}
                   fullName={`Hot Chocolate Fudge`}
                   link={`63dc950a712aaddd67eef0d2`}
            />
            <Dish image={`https://www.themealdb.com/images/media/meals/1529445893.jpg`}
                   cuisine={'chinese'}
                   fullName={`Hot and Sour Soup`}
                   link={`63dc950a712aaddd67eef0d2`}
            />
            <Dish image={`https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg`}
                   cuisine={'italian'}
                   fullName={`Pizza Express Margherita`}
                   link={`63dc94e9712aaddd67eef0ce`}
            />
            <Dish image={`https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg`}
                   cuisine={'indian'}
                   fullName={`Dal fry`}
                   link={`63dc94aa712aaddd67eef0ca`}
            />
        </div>
    </>
  )
}

export default Home