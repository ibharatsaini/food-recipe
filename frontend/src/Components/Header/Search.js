import React,{useEffect, useState} from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/search.css'
function Search() {
    const [search,setSearch] = useState("")
    const [result,setResult] = useState([])
    const navigate  = useNavigate()
    function fetchResult(value){
        setSearch(value)
        fetch(`/v1/dish/search?keyword=${value}`)
            .then(res=>res.json())
            .then(data=>{
                if(data.success && data.data.length>0){
                    setResult(prev=>[...data.data])
                }
            })
    }
    function handleClick(){
         navigate(`/search?q=${search}`)
    }
    useEffect(()=>{
        const search = document.querySelector("#searchb")

        search.addEventListener('click',handleClick)
        return ()=>{
            search.removeEventListener('click',handleClick)
        }
    },[])
    return (
        <div id='search'>
            <input type={'text'} value={search}
                onChange={({target})=>{fetchResult(target.value)}}
                />
            <span id='searchb' onClick={handleClick}>
                <AiOutlineSearch />
            </span>
            <div className='searchResult'>
                {
                    result.map(el=>{
                        return (
                            <Link to={`/recipe/${el._id}`} className='res'>
                                {
                                    el.fullName
                                }
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Search