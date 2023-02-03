import { fetchUser } from "../actions/user.actions"

const userInfo = fetchUser()


const initialState={
    loading:false,
    error:null,
    user:userInfo,
    isAuthenticated: userInfo?.hasOwnProperty('_id')?true :false
}


export function userReducer(state=initialState,action){
        switch(action.type){
                case 'UPDATE_USER':
                console.log(state)
                    return {
                        loading:false,
                        user:action.payload,
                        error:null,
                        isAuthenticated:true
                    }
                case 'LOGOUT_USER':
                    console.log(state)
                    return {
                        laoding:false,
                        user:{},
                        isAuthenticated:false,
                        error:null
                    }
                case 'LOADING_USER':
                    console.log(state,'loading')
                    return {
                        loading:true,
                        user: {},
                        error:null,
                        isAuthenticated:false
                    }
                case 'ERROR_USER':
                    return{
                        loading:false,
                        user:{},
                        error:action.payload,
                        isAuthenticated:false
                    }
                default:
                    return state
        }
}