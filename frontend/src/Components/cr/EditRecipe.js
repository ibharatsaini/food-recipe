import React, { useState,useEffect } from 'react'
import "../styles/createrecipe.css"
import {MdImage,MdDelete} from 'react-icons/md'
import Loader from '../Loader/Loader'
import HigherComponent from '../higherComponent'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
function EditRecipe({ recipe,changeState,submitFile,isLoading,
                    addStep,imgLink,addIngredient,createRecipe,ingredients,
                    deleteIngredient,step,deleteStep }) {



    function deleteFile(){
        changeState({recipe:{
            ...recipe,
            image:null
        }})
    }

    const {recipeId} = useParams()

    const navigate = useNavigate()
    const {user,isAuthenticated} = useSelector(state=>state.user)
    if(!isAuthenticated) {
         navigate(`/`)
    }

    function callcreateRecipe(){
        const recipe = createRecipe(`/api/v1/recipe/update/${recipeId}`)
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
    useEffect(()=>{
        fetch(`/api/v1/recipe/edit/${recipeId}`)
            .then(res=>res.json())
            .then(data=>{
                if(!data.success) return 
               
                const {cookingTime,ingredients,serves,steps} = data.data
                console.log(cookingTime,ingredients,serves,steps)
                changeState({recipe:{
                    fullName:data.data.dish.fullName,
                    cuisine:data.data.dish.cuisine,
                    image:data.data.dish.image,
                    ingredients:ingredients,
                    steps:steps,
                    cookingTime:cookingTime,
                    serves:serves,
                    ingredientsName: data.data.dish.ingredients
                }})
            })
    },[])


    function editIngredient(i,name,quantity){
        // if(name.inclues(" ") || quantity.inclues(" ")) return 
        const ingredients = [...recipe.ingredients]
        const ingredientsName = [...recipe.ingredientsName]
        console.log(ingredients,ingredientsName)
        ingredientsName[i]=name
        ingredients[i]=`${quantity} ${name}`
        changeState({
            recipe:{
                ...recipe,
                ingredients,
                ingredientsName
            }
        })   
    }
    function editStep(i,el){
        const step = [...recipe.steps]
        step[i] =el
        changeState({recipe:{...recipe,steps:step}})
    }
   
  return (
    <div id="createRecipe">
        <h2>Edit Your Recipe</h2>
        <div className='dishname'>
            {/* <div className='inputField'> */}
            <label>Image</label>
            <p>File types supported: JPG, PNG Max Size: 10 MB</p>
            <div className='imgUp'>
                <div className='imageLoad'>
                    { isLoading ? 
                      <Loader /> :
                      !recipe.image  ?
                      <label>
                        <div className='flex column ali'>
                            <MdImage style={{fontSize:'40px'}}/>
                            <p>Click here to upload</p>
                        </div>
                       <input type='file' accept='image/*' onChange={submitFile} 
                                   style={{display:'none'}}>
            
                        </input>
                      </label> : 
                      recipe.image &&  <>
                      <img src={recipe.image}></img>
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
            <input type="text" onChange={({target})=>{changeState({recipe:{...recipe,fullName:target.value}})}} value={recipe.fullName} ></input>
        </div>
        <div className='dishname'>
        <label>Cuisine</label>

            {/* <input type="text" value={recipe.fullName} ></input> */}
            <select name='cuisine' value={recipe.cuisine} id='cuisine' onChange={({target})=>changeState({recipe:{...recipe,cuisine:target.value}})}>
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
                <input className='ingInput' 
                       onChange={({target})=>changeState({ingredients:{...ingredients,name:target.value}})} 
                       type={'text'} placeholder={""} 
                       value={ingredients.name} />
                
            </div>
            <div className='row'>
                <insert>Quantity</insert>
                <input className='ingInput'  onChange={({target})=>changeState({ingredients:{...ingredients,quantity:target.value}})}  autoComplete='false' type={'text'} value={ingredients.quantity} />
            </div>
            <span onClick={addIngredient}>Add</span>
            
            {
                    recipe.ingredients.map((el,i)=>{
                        const name = el.split(" ")[1]
                        const quantity = el.split(" ")[0]
                        return (
                            <>
                            <div className='row'>
                                <insert>Name</insert>
                                <input className='ingInput' 
                                    onChange={({target})=>editIngredient(i,target.value,quantity)} 
                                    type={'text'} placeholder={""} 
                                    value={name} />                                
                            </div>
                            <div className='row'>
                                <insert>Quantity</insert>
                                <input className='ingInput'  onChange={({target})=>editIngredient(i,name,target.value)} 
                                         autoComplete='false' type={'text'} 
                                         value={quantity} />
                            </div>
                            <span onClick={()=>deleteIngredient(i)}>Del</span>
                            
                            </>

                        )
                    })
                }
            
            
        </div>
        <div className='dishname'>
            <label>Directions</label>

            <input style={{width:'85%',marginRight:"10px"}}  type={'text'} value={step} onChange={({target})=>{changeState({step:target.value})}} />
            <span onClick={addStep}>Add</span>

            {
                  recipe.steps.map((el,i)=>{
                    return (
                        <>
                        <input style={{width:'85%'}} type="text"
                                value={el} onChange={({target})=>editStep(i,target.value)}
                                />
                       
                                <span onClick={()=>deleteStep(i)}>Delete</span>
                                </>

                    )
                  })
            }
        </div>
        <div className='dishname'>
            <div className='row'>
                <insert>Cooking Time</insert>
                <input 
                     className='ingInput' 
                     onChange={({target})=>changeState({recipe:{...recipe,cookingTime:target.value}})} 
                     type={'text'} placeholder={""} 
                     value={recipe.cookingTime} 
                />
            </div>
            <div className='row'>
                <insert>Serves</insert>
                <input className='ingInput'  onChange={({target})=>changeState({recipe:{...recipe,serves:target.value}})}  autoComplete='false' type={'text'} value={recipe.serves} />
            </div>
            
        </div>
        
        <div className='saveRecipe' 
             onClick={()=>{callcreateRecipe()}}>
                    Update Recipe
        </div>
    </div>
  )
}

export default HigherComponent(EditRecipe)
