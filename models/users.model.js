const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = new mongoose.Schema({

                    fullName:{
                        type:String,
                        required:[true,"Name is required"],
                        min:[3,"Name is too short"],
                        max:[25,"Name is too short"]
                    },
                    email:{
                        type:String,
                        required:[true,"Email is required"],
                    },
                    password:{
                        type:String,
                        required:[true,"Password is required"],
                    },
                    recipes:[{
                        type:mongoose.Schema.Types.ObjectId,
                        ref:"recipes"
                    }],
                    image:{
                        type:String
                    }
                    
},{timestamps:true})

User.pre('save',async function(next){
    console.log("user")
    if(!this.isModified("password")) return next()
    console.log(this.password)
    this.password = await bcrypt.hash(this.password,8)
    console.log(this.password)
    next()
})

User.methods.comparePassword = function(password){
        const passwordHash = this.password
        console.log(password,passwordHash)
        return new Promise((resolve,reject)=>{
            bcrypt.compare(password,passwordHash,function(err,same){
                if(err) return reject(err)
                resolve(same)
            })
        })
}


User.methods.updatePassword = function(){
      return bcrypt.hash(this.password,8 )
}

User.methods.getJwt = function(){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES
    })
}


module.exports = mongoose.model("users",User)


