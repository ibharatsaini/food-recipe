export const UPDATE_RECIPE ='UPDATE_RECIPE'
export const ERROR_RECIPE = 'ERROR_REICPE'
export const LOADING_RECIPE='LOADING_RECIPE'

export const loadingRecipe=()=>{
    return {
        type: LOADING_RECIPE
    }
}

export const errorRecipe =(data)=>{
    return {
        type: ERROR_RECIPE,
        payload: data
    }
}

export const updateRecipe=(data)=>{
    return {
        type: UPDATE_RECIPE,
        payload: data
    }
}


export const fetchRecipe=(id)=>async(dispatch)=>{
    try{
        dispatch(loadingRecipe())
        const recipe = await( await fetch(`http://localhost:8080/api/v1/recipe/${id}`)).json()
        if(!recipe.success) return dispatch(errorRecipe(recipe.error))

        return dispatch(updateRecipe(recipe.data))
    }catch(e){
        console.log(e)
    }
}