import React, { useState } from 'react'
import Search from './Search'
import '../styles/header.css'
import { Link, useLocation ,useNavigate} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { logoutUser } from '../../reduxStore/actions/user.actions'
import Avatar from '../../images/avatar.png'
import { toast } from 'react-hot-toast'

function Header() {
  const userData = useSelector(state=>state.user)
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const [visible,setVisible] =  useState(false)
  if(location.pathname == ('/join-us') || location.pathname == '/login' ){
    return null
  }
  

  function checkProfile(){
    setVisible(prev=>!prev)
    console.log(visible)
  }
  function logout(){
    localStorage.clear()
    dispatch(logoutUser())
    toast.success("Logged Out!")
    navigate("/")

  }
  return (
    <header>
        <div id='logo'>
            Reci-eppy
        </div>
        <Search />
        <div className="dropDown joinus">
                   {/* { userData.isAuthenticated ? <div onClick={checkProfile} className="profile"> <img src={process.env.PUBLIC_URL+"/avatar.png"} />{visible &&( <div id="abs"> <Link to={"/my-account"} >My Account</Link><span onClick={logout}>Log Out</span></div>)} </div> : <Link className="jbut" to="/join-us">Join Us</Link>} */}
            { userData.isAuthenticated ?
                <div onClick={checkProfile} 
                      className="profile"> 
                <img src={Avatar} />
                 {visible && 
                      ( <div id="abs">
                            <Link to={"/my-account"} >
                                My Account
                            </Link>
                            <span onClick={logout}>
                              Log Out
                            </span>
                        </div>
                        )
                      }
                  </div> : 
                  <Link className="jbut" to="/join-us">Join Us</Link>
              }
        </div>
    </header>
  )
}

export default Header