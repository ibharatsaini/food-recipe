import React, { useState } from 'react'
import "../styles/createrecipe.css"
import {MdImage,MdDelete} from 'react-icons/md'
import Loader from '../Loader/Loader'
import HigherComponent from '../higherComponent'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

function AddRecipe({ recipe,changeState,submitFile,isLoading,deleteFile,
                    addStep,imgLink,addIngredient,createRecipe,ingredients,
                    deleteIngredient,step,deleteStep }) {


        const {isAuthenticated} = useSelector(state=>state.user)
        const navigate = useNavigate()

        if(!isAuthenticated) {
            navigate(`/`)
        }

        function callcreateRecipe(){
            const recipe = createRecipe(`/api/v1/recipe/create`)
            recipe.then(res=>res.json())
                        .then(data=>{
                            if(!data.success){
                                toast.error(data.error)
                            }else{
                                console.log('redrect')
                                navigate(`/recipe/${data.data._id}`)
                            }
                        })
                        .catch(e=>{
                            console.log(e)
                        })
        }


   
  return (
    <div id="createRecipe">
        <h2>Add Your Recipe</h2>
        <div className='dishname'>
            {/* <div className='inputField'> */}
            <label>Image</label>
            <p>File types supported: JPG, PNG Max Size: 10 MB</p>
            <div className='imgUp'>
                <div className='imageLoad'>
                    { isLoading ? 
                      <Loader/> :
                      !imgLink ?
                      <label>
                        <div className='flex column ali'>
                            <MdImage style={{fontSize:'40px'}}/>
                            <p>Click here to upload</p>
                        </div>
                       <input type='file' accept='image/*' onChange={submitFile} 
                                   style={{display:'none'}}>
            
                        </input>
                      </label> : 
                      imgLink  &&  <>
                      <img src={imgLink}></img>
                      <button type='button' onClick={deleteFile}>
                        <MdDelete/>
                        </button>
                      </>
                    }
                    
                </div>
            {/* </div> */}
            </div>
            
        </div>
        <div className='dishname'>
            <label>Dish name</label>
            <input type="text" 
                   onChange={({target})=>{
                    changeState({recipe:{...recipe,fullName:target.value}})}} 
                    value={recipe.fullName} >

             </input>
        </div>
        <div className='dishname'>
        <label>Cuisine</label>

            {/* <input type="text" value={recipe.fullName} ></input> */}
            <select name='cuisine' id='cuisine' onChange={({target})=>changeState({recipe:{...recipe,cuisine:target.value}})}>
                <option value='indian'>Indian</option>
                <option value='italian'>Italian</option>
                <option value='chinese'>Chinese</option>
                <option value='mughlai'>Mughlai</option>
            </select>
        </div>
        <div className='dishname'>
            <label>Ingredients</label>
            <div className='row'>
                <insert>Name</insert>
                <input className='ingInput' onChange={({target})=>changeState({ingredients:{...ingredients,name:target.value}})} type={'text'} placeholder={""} value={ingredients.name} />
            </div>
            <div className='row'>
                <insert>Quantity</insert>
                <input className='ingInput'  onChange={({target})=>changeState({ingredients:{...ingredients,quantity:target.value}})}  autoComplete='false' type={'text'} value={ingredients.quantity} />
            </div>
            <span onClick={addIngredient}>Add</span>
            <div className='addedStuff'>
                    {
                        recipe.ingredients.map((el,i)=>(
                            <div className='added'>
                                <p>
                                    {el}
                                </p>
                                <span onClick={()=>{deleteIngredient(i)}} className='cross'>X</span>
                            </div>
                        ))
                    }
            </div>
            
        </div>
        <div className='dishname'>
            <label>Directions</label>

            <input style={{width:'85%',marginRight:"10px"}}  type={'text'} value={step} onChange={({target})=>{changeState({step:target.value})}} />
            <span onClick={addStep}>Add</span>
            <div className='addedStuff'>
                {recipe.steps.map((el,i)=>(
                    <div className='added'>
                        <p>
                            {el}
                        </p>
                        
                        <span onClick={()=>{deleteStep(i)}} className='cross'>X</span>
                    </div>
                ))}
            </div>
            {/* <input className='ingInput' type={text} value={ingredients.quantity} /> */}
        </div>
        <div className='dishname'>
            <div className='row'>
                <insert>Cooking Time</insert>
                <input className='ingInput' onChange={({target})=>changeState({recipe:{...recipe,cookingTime:target.value}})} type={'text'} placeholder={""} value={recipe.cookingTime} />
            </div>
            <div className='row'>
                <insert>Serves</insert>
                <input className='ingInput'  onChange={({target})=>changeState({recipe:{...recipe,serves:target.value}})}  autoComplete='false' type={'text'} value={recipe.serves} />
            </div>
            
        </div>
        
        <div className='saveRecipe' onClick={()=>{callcreateRecipe()}}>
                    Save Recipe
        </div>
    </div>
  )
}

export default HigherComponent(AddRecipe)
