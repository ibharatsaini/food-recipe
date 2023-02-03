import React, { useEffect, useState } from 'react'
import Directions from './Directions'
import Ingredients from './Ingredients'
import "../styles/recipe.css"
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchRecipe } from '../../reduxStore/actions/recipe.actions'
import { AiOutlineClockCircle} from 'react-icons/ai'
import { ImSpoonKnife } from 'react-icons/im'

function Recipe() {

    // const [recipe,setRecipe] = useState(null)
    const {recipe,loading,error} = useSelector(state=>state.recipe)
    const dispatch = useDispatch()
    const {recipeId}  = useParams()
    useEffect(()=>{
        dispatch(fetchRecipe(recipeId))
        // fetch(`http://localhost:8080/api/v1/recipe/${"63d9e31753f0bd23f72cf1ef"}`)
        //         .then(res=>res.json())
        //         .then(data=>{
        //             console.log(data)
        //             setRecipe({data})
        //         })
        //         .catch(e=>{
        //             console.log(e)
        //         })
        const rec = {
            dish:{
                name:"matar paneer",
                image:"https://www.themealdb.com/images/media/meals/xxpqsy1511452222.jpg",
            },
            createdBy:{
                fullName:"bharat saini"
            },
            ingredients: ['1 tbls sunflower oil', '225g paneer', '2 ginger', '1 tsp  cumin', '1 tsp  turmeric', '1 tsp  coriander',
                  '1 green chilli', '4 large tomato', '150g peas', '1 tsp  garam masala',
                   'Small bunch coriander', 'to serve naan bread'],
            steps: ['Heat the oil in a frying pan over high heat until it’s shimmering hot',
             ' Add the paneer, then turn the heat down a little', ' Fry until it starts to brown at the edges, then turn it over and brown on each side – the paneer will brown faster than you think, so don’t walk away', ' Remove the paneer from the pan and drain on kitchen paper', '\r\nPut the ginger, cumin, turmeric, ground coriander and chilli in the pan, and fry everything for 1 min', ' Add the tomatoes, mashing them with the back of a spoon and simmer everything for 5 mins until the sauce smells fragrant', ' Add a splasher if i of water if it’s too thick', ' Season well', ' Add the peas and simmer for a further 2 mins, then stir in tsprinklhe paneer and sprinkle over the garam masala', 
            ' Divide between two bowls, top with coriander leaves and seroti or ve with naan bread, roti or rice'],
            cookingTime:"1 hour",
            serves:4
        }
        // setRecipe(rec)
    },[])
    
    if(!recipe) return null
    console.log(recipe)
    return (
        
        <div id="recipe">
          <div id="recipe-about">
                <div className='recipe-img'>
                    <div className='imageDiv'>
                        <img src={recipe.dish.image} />
                    </div>
                    <div className='about'>
                        <h3>{recipe.dish.fullName}</h3>
                        <section>
                            {/* Recipe By: {recipe.createdBy.name} */}
                        </section>
                        <p>
                        Lorem ipsum is placeholder text commonly used in the graphic, 
                        print, and publishing industries for previewing layouts and 
                        visual mockups Lorem ipsum is placeholder text commonly used in the graphic, 
                        print, and publishing industries for previewing layouts and 
                        visual mockups.
                        </p>
                    </div>
                </div>
                <div className='meta-info'>
                    <div className='icDiv'>
                        <AiOutlineClockCircle className='ico' />
                        <div className='misc'>
                            <div className='head'>
                                Prep
                            </div>
                            <div className='time'>
                                15 minutes
                            </div>
                        </div>
                    </div>
                    <div className='icDiv'>
                        <AiOutlineClockCircle className='ico' />
                        <div className='misc'>
                            <div className='head'>
                                Cook
                            </div>
                            <div className='time'>
                                {recipe.cookingTime}
                            </div>
                        </div>
                    </div>
                    <div className='icDiv'>
                        <ImSpoonKnife className='ico' />
                        <div className='misc'>
                            <div className='head'>
                                Serves
                            </div>
                            <div className='time'>
                                {recipe.serves}
                            </div>

                        </div>
                    </div>
                        

                    
                </div>
          </div>
          <Ingredients ingredients={recipe.ingredients} />
          <Directions steps={recipe.steps} />
          
        </div>
    )
}

export default Recipe