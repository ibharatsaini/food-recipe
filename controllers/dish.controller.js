const Dish = require("../models/dishes.model")
const catchAyncErrors = require("../utils/catchAsyncErrors")
const ErrorHandler = require("../utils/ErrorHandler")

const searchDish = async(req,res,next)=>{
    const {keyword} = req.query
    // const dishes = await Dish.find({$or: [ {fullName:{$regex: keyword,$options:"i"}} ,{$expr: { $in: [keyword, "$ingredients"]}}]},['fullName'])
    const dishes = await Dish.find({$or: [ {fullName:{$regex: keyword,$options:"i"}} , {ingredients:{$regex: keyword,$options:"i"}} ]},['fullName'])
    console.log(dishes)
    if(dishes.length == 0) return next(new ErrorHandler(404,"No Dishes Found"))
    console.log(dishes)
    return res.status(200)
                    .json({
                        success:true,
                        data:dishes
                    })

}

const updateDish = async(req,res,next)=>{
    const {id} = req.params
    const dish = await Dish.findByIdAndUpdate(id,{...req.body},{new:true})

    if(!dish) return next(new ErrorHandler(404,"Dish not updated"))

    return res.status(200)
                .json({
                    success:true,
                    data:dish
                })
}


module.exports = {
    searchDish: catchAyncErrors(searchDish),
    updateDish: catchAyncErrors(updateDish)
}