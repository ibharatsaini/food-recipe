import React,{useState,useEffect} from 'react'
import { toast } from 'react-hot-toast'
import Loader from '../Loader/Loader'
import Dish from '../Dish/Dish'
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

                    setRecipe(prev=>({...data.data}))
                })
                
    },[])

    return (
        <div id='my-recipe'>
            <h2>My Recipes</h2>
            {
                !recipe ? <Loader />
                : (
                    recipe.map(el=>{
                        return <Dish fullName={el.fullName}
                                    link={el._id}
                                    image={el.image}
                                    cuisine={el.cuisine}
                                    edit={true} 
                                />
                    })
                )
            }
        </div>
    )
}

export default MyRecipes