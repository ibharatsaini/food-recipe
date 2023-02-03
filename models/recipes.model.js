const mongoose = require("mongoose")

const Recipe = new mongoose.Schema({
            dish:{
                type: mongoose.Schema.Types.ObjectId,
                ref:"dishes"
            },
            ingredients: [{
                type:String
            }],
            steps:[{
                type:String
            }],
            createdBy:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"users",
                // required:[true,"User is required"],
                // select:false
            },
            cookingTime:{
                type:String
            },
            serves:{
                type:Number
            },
            
},{timestamps:true})

module.exports = mongoose.model("recipes",Recipe)