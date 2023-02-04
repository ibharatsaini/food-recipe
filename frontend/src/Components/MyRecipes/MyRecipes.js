import React,{useState,useEffect} from 'react'
import { toast } from 'react-hot-toast'
import Loader from '../Loader/Loader'
import Dish from '../Dish/Dish'
import '../styles/myrecipe.css'
import { useNavigate } from 'react-router-dom'
function MyRecipes() {
    const [recipe,setRecipe] = useState(null)
    const navigate = useNavigate()

    useEffect(()=>{
        fetch(`/api/v1/recipe/my-recipes`)
                .then(res=>res.json())
                .then(data=>{
                    if(!data.success){
                       toast.error("No dishes found")
                       navigate(`/`)

                    }

                    setRecipe(prev=>[...data.data])
                })
                
    },[])

    return (
        <div id='my-recipe'>
            <h2>My Recipes</h2>
            <div className='recS'>
                    {
                        !recipe ? <Loader />
                        : (
                            recipe.map(el=>{
                                const {dish} = el
                                return (<Dish fullName={dish.fullName}
                                            link={el._id}
                                            image={dish.image}
                                            cuisine={dish.cuisine}
                                            edit={true} 
                                        />)
                            })
                        )
                    }
            </div>
        </div>
    )
}

export default MyRecipes