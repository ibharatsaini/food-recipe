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

    const {recipe,loading,error} = useSelector(state=>state.recipe)
    const dispatch = useDispatch()
    const {recipeId}  = useParams()

    useEffect(()=>{
        dispatch(fetchRecipe(recipeId)) 

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