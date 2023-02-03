const Recipe = require("../models/recipes.model")
const Dish = require("../models/dishes.model")
const ErrorHandler = require("../utils/ErrorHandler")
const catchAyncErrors = require("../utils/catchAsyncErrors")

const createRecipe = async(req,res,next)=>{
        console.log(req.body)
        const {fullName, cuisine, image , ingredientsName,steps,ingredients,cookingTime,serves} = req.body
        // console.log(ingredentsName)
        const dish = await Dish.create({fullName,cuisine,image,ingredients:ingredientsName})
        console.log(ingredients)
        if(!dish) return next(new ErrorHandler(404, "Dish not created"))

        const recipes = await Recipe.create({dish:dish._id,ingredients,steps, cookingTime,serves})

        if(!recipes) return next(new ErrorHandler(404, "Recipe not created"))

        return res.status(301)
                    .json({
                        success:true,
                        data:recipes
                    })
}

const getRecipe = async(req,res,next)=>{

    const {id} = req.params
    
    const recipe = await Recipe.findById(id).populate(["dish","createdBy"])
    
    if(!recipe)  return next(new ErrorHandler(404,"Recipe not found"))

    return res.status(200)
                    .json({
                        success:true,
                        data:recipe
                    })
}


const allRecipe = async(req,res,next)=>{

    const recipes = await Recipe.find()

    if(!recipes)  return next(new ErrorHandler(404,"Recipe not found"))

    return res.status(200)
                    .json({
                        success:true,
                        data:recipes
                    })


}
const editRecipe=async(req,res,next)=>{
    const {id} = req.params
    const recipe = await Recipe.findById(id).populate(["dish"])
    if(!recipe) return next(new ErrorHandler(404,"Recipe not found"))
    return res.status(200)
            .json({
                success:true,
                data:recipe
            })
    
}

const updateRecipe = async(req,res,next)=>{
    const {id} = req.params
    const recipe = await Recipe.findById(id).populate(["dish"])
    if(!recipe) return next(new ErrorHandler(404,"Recipe not found"))
    const {fullName, cuisine, image , ingredientsName,steps,ingredients,cookingTime,serves} = req.body
        // console.log(ingredentsName)
    const dish = await Dish.findByIdAndUpdate(recipe.dish._id,{fullName,cuisine,image,ingredients:ingredientsName})
    // const dish = await Dish.create({fullName,cuisine,image,ingredients:ingredientsName})
    console.log(ingredients)
    if(!dish) return next(new ErrorHandler(404, "Dish not created"))

    const recipes = await Recipe.findByIdAndUpdate(recipe._id,{ingredients,steps, cookingTime,serves},{new:true})

    if(!recipes) return next(new ErrorHandler(404, "Recipe not created"))
    return res.status(200)
                .json({
                    success:true,
                    data:recipes
                })
}
module.exports = {
    createRecipe: catchAyncErrors(createRecipe),
    getRecipe:   catchAyncErrors(getRecipe),
    editRecipe: catchAyncErrors(editRecipe),
    updateRecipe: catchAyncErrors(updateRecipe),
    allRecipe: catchAyncErrors(allRecipe)
}