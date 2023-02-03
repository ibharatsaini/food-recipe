import React, {  useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createUser } from '../../reduxStore/actions/user.actions'
// import Background from "../../images/background.jpg"
import Loader from '../Loader/Loader'
import toast from 'react-hot-toast'
import "../styles/join.css"

function JoinUs() {
    const userData = useSelector(state=>state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [sign ,setSign] = useState({firstName:"",lastName:"",email:"",password:"",confirmPassword:""})
    function changeSign(e){

      setSign(prev=>({...prev,[e.target.name]:e.target.value}))
    }
   
   useEffect(()=>{
        console.log(userData)
        if(userData.isAuthenticated){
           const location = window.location.href
           location.indexOf("redirect") !== -1
                 ? navigate(location.split("redirect=")[1]) 
                 : navigate("/")
        }
        userData.error && toast.error("Couldn't Sign Up")
      },[userData])
   
    return (
      <>
      <div className='backBanner'>
             <div className='joinUs'>
                    <section>Become</section>
                    <h2>A Member</h2>
                    <div className='inputFields'>
                      {/* <div className='colgr'> */}
                      <div className='grt'>
                        <h3>Name<span>*</span></h3>
                        <input type="text" name="fullName" placeholder='Enter Your Email' value={sign.fullName} onChange={(e)=>changeSign(e)} />
                      </div>
                      <div className='grt'>
                        <h3>EMAIL<span>*</span></h3>
                        <input type="text" name="email" placeholder='Enter Your Email' value={sign.email} onChange={(e)=>changeSign(e)} />
                      </div>
                      <div className='grt'>
                        <h3>Password<span>*</span></h3>
                        <input type="password"  name="password" placeholder='Enter Password' value={sign.password} onChange={(e)=>changeSign(e)} />
                      </div>
                      <div className='grt'>
                        <h3>Confirm Password<span>*</span></h3>
                        <input type="password" name="confirmPassword" placeholder='Confirm Password' value={sign.confirmPassword} onChange={(e)=>changeSign(e)} />
                      </div>
                        
                    </div>
                    <div className='middle'>
                           <div onClick={()=>{dispatch(createUser(sign))}} className='submitButton'>
                               {userData.loading ? <Loader /> : "Sign Up"}
                                     
                           </div>
                        </div>
                    <div className='already'>
                      Already a user?<Link to="/login">Login</Link>
                    </div>
             </div>
      </div>
      </>
      
      
    )
}

export default JoinUs