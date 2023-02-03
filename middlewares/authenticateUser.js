const jwt = require("jsonwebtoken")
// const crudOperations = require("..//crudOperations")
const User = require("../models/users.model")
const catchAyncErrors = require("../utils/catchAsyncErrors")
async function authenticateUser(req,res,next){
        const token =  req.cookies?.token

        if(!token) return res.status(404).json({success:false,error:"Token not found"})

        const {_id} = jwt.verify(token,process.env.JWT_SECRET)

        const user = await User.findById(_id)

        if(!user)  return res.status(404).json({success:false,error:"User not found"})

        console.log(user)
        req.user = user
        next()
}

module.exports = catchAyncErrors(authenticateUser)