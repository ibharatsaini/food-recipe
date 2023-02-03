import { ERROR_RECIPE, LOADING_RECIPE, UPDATE_RECIPE } from "../actions/recipe.actions"

const initialState = {
    error:null,
    loading:false,
    recipe:null
}

export const recipeReducer = (state=initialState,action)=>{
        switch(action.type){
            case ERROR_RECIPE:
                return {
                    ...state,
                    error:action.payload,
                    loading:false,
                    recipe:null
                }
            case LOADING_RECIPE:
                return {
                    error:null,
                    loading:true,
                    recipe:null
                }
            case UPDATE_RECIPE:
                return {
                    error:null,
                    loading:false,
                    recipe:{...action.payload}
                }
            default:
                return state
        }
}