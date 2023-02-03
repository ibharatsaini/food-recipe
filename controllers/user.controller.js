const User = require("../models/users.model")
const catchAyncErrors = require("../utils/catchAsyncErrors")
const ErrorHandler = require("../utils/ErrorHandler")
const sendToken = require("../utils/sendToken")



const createUser = async(req,res,next)=>{
    const {fullName,email,password} = req.body

    const user = await User.create({fullName,email,password})
    
    if(!user) return next(new ErrorHandler(404,"User not created"))

    sendToken(user,res)
}

const loginUser = async(req,res,next)=>{
    const {email,password} = req.body

    const user = await User.findOne({email})
    
    if(!user) return next(new ErrorHandler(404,"Email and Password does not match"))

    const isMatched = await user.comparePassword(password)
    
    if(!isMatched) return next(new ErrorHandler(404,"Email and Password does not match"))

    sendToken(user,res)
}




module.exports = {
    createUser : catchAyncErrors(createUser),
    loginUser  : catchAyncErrors(loginUser),
    
}