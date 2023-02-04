import React,{useState,useEffect} from 'react'
import { toast } from 'react-hot-toast'
import Loader from '../Loader/Loader'
import Dish from '../Dish/Dish'
function MyRecipes() {
    const [recipe,setRecipe] = useState(null)

    useEffect(()=>{
        fetch(`/api/v1/recipe/my-recipe`)
                .then(res=>res.json())
                .then(data=>{
                    if(!data.success) return toast.error("No dishes found")
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