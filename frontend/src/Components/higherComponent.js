import {ref,uploadBytesResumable,getDownloadURL,deleteObject } from 'firebase/storage'
import { useState } from 'react';
import {storage} from '../config/firebase.config';
import React from 'react'
import { toast } from 'react-hot-toast';


//Higher order component to add and edit the recipe

function higherComponent(WrappedComponent){

    class NewComponent extends React.Component{

        constructor(props){
            super(props)
            this.state = {
                recipe:{
                    fullName:"",
                    cuisine:"indian",
                    steps:[],
                    image:null,
                    ingredientsName:[],
                    ingredients:[],
                    cookingTime:"",
                    serves:""    
                },
                ingredients:"",
                step:"",
                imgLink:null,
                isLoading:false

            }
        }
        submitFile=(e)=>{
            // setIsLoading(true)
            this.changeState({isLoading:true})
            console.log('called')
            console.log(this.state.imgLink)
            // e.preventDefault()
            const imgUp=e.target.files[0]
            if(imgUp!=null){
              console.log(imgUp)
              let url= `images/${Date.now()}`
              const imgref= (ref(storage,url))
              console.log(url)
              const uploadTask= uploadBytesResumable(imgref,imgUp)
              uploadTask.on('state_changed',(snapshot)=>{
                const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
              },(error)=>{
                // setIsLoading(false)
                this.changeState({isLoading:false})

                console.log(error)
              },()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then(url=>{
                    //   setIsLoading(false)
                    //   setImgLink(url)
                    console.log(url)
                   this.changeState({
                       isLoading:false,
                       imgLink:url,
                       recipe:{
                            ...this.state.recipe,
                            image:url
                       }
                    })

                  
                   
              })
             
              })
            }
        }

        deleteFile=()=>{
            this.setState(prev=>({...prev,isLoading:true}))

            deleteObject(ref(storage,this.state.imgLink)).then(()=>{

                this.setState(prev=>({...prev,
                    isLoading:false,
                    imgLink:null
                }))          
            }).catch(()=>{
                this.setState(prev=>({...prev,isLoading:false}))

            })  
        }
        
        addStep=()=>{
            if(this.state.step.length==0) return 
            this.changeState({
                recipe:{
                    ...this.state.recipe,
                    steps:[
                        ...this.state.recipe.steps,
                        this.state.step
                    ]
                },
                step:""
            })

        }
        deleteStep=(i)=>{
            const steps = [...this.state.recipe.steps]
            steps.splice(i,1)
            this.setState(prev=>({
                ...prev,
                recipe:{
                    ...prev.recipe,
                    steps:[...steps]
                }
            }))
            console.log(this.state.recipe.steps)
        }
        deleteIngredient=(i)=>{
            const ing = [...this.state.recipe.ingredients]
            const names = [...this.state.recipe.ingredientsName]
            ing.splice(i,1)
            names.splice(i,1)
            this.changeState({
                recipe:{
                    ...this.state.recipe,
                    ingredients:[...ing],
                    ingredientsName:[...names]
                }
            })
           
        }
        createRecipe=(url)=>{
            console.log(this.state.recipe)
            return fetch(url,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(this.state.recipe)
            })
                        
        }
        addIngredient=()=>{
            if(this.state.ingredients.name.length==0) return 
            this.changeState({
                recipe:{
                    ...this.state.recipe,
                    ingredients:[
                        ...this.state.recipe.ingredients,
                        `${this.state.ingredients.quantity} ${this.state.ingredients.name}`
                    ],
                    ingredientsName:[
                        ...this.state.recipe.ingredientsName,
                        this.state.ingredients.name
                    ]
                },
                ingredients:{name:"",quantity:""}
            })

            console.log(this.state.recipe.ingredients)
        }
        changeState=(change)=>{
            console.log(change)
            console.log(this.state)
            this.setState(prev=>({
                ...prev,
                ...change
            }))
        }
        render() {
          return  <WrappedComponent  recipe={this.state.recipe} changeState={this.changeState}
                                createRecipe={this.createRecipe}  deleteStep={this.deleteStep}
                                step={this.state.step} addStep={this.addStep} ingredients={this.state.ingredients}
                                submitFile={this.submitFile} deleteFile={this.deleteFile}
                                deleteIngredient={this.deleteIngredient}
                                imgLink={this.state.imgLink}
                                isLoading={this.state.isLoading} addIngredient={this.addIngredient} />
        }
    }
    return NewComponent
}

export default higherComponent