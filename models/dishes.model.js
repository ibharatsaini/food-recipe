const mongoose = require("mongoose")


const Dish = new mongoose.Schema({
    
                        fullName:{
                            type:String,
                            required:[true,"Name is required"],
                            min:[3,'name is too short'],
                            max:[25,'name is too long'],
                            // unique: [true,'Dish already present'],
                        },
                        cuisine: {
                            type:String,
                            enum: {
                                values: ['italian','indian','mughlai','chinese','other'],
                                message: '{VALUE} is not valid'
                            }
                        },
                        recipe:{
                            type: mongoose.Types.ObjectId,
                            ref:"recipes"
                        },
                        image:{
                            type:String,
                            required:[true,"Image is required"]
                        },
                        ingredients: [{
                            type:String
                        }]

},{timestamps:true})

module.exports = mongoose.model("dishes", Dish)