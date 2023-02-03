import {createStore,combineReducers, applyMiddleware} from 'redux'
import { recipeReducer } from './reducers/recipe.reducer'
import thunk from 'redux-thunk'
import { userReducer } from './reducers/user.reducer'


const reducers = combineReducers({
    recipe:recipeReducer,
    user:userReducer
})


const store = createStore(reducers,applyMiddleware(thunk))

export default store