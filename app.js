const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const errorHandler = require("./middlewares/errorHandler")

const dotenv =  require("dotenv")

dotenv.config({path:"./.env"})

const app = express()
const recipreRouter = require("./routes/recipe.routes")
const userRouter = require("./routes/user.routes")
const dishRouter = require("./routes/dish.routes")
app.use(cors())
app.use(express.json())
app.use(cookieParser())


app.use("/api/v1/recipe",recipreRouter)
app.use("/api/v1/user",userRouter)
app.use("/api/v1/dish",dishRouter)

if(process.env.NODE_ENV=='production'){
    console.log('production running')
    const path = require('path');

    app.use(express.static(path.join(__dirname,"./frontend/build")))
    app.get('*', (req, res) => {
         res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    });
}


app.use(errorHandler)

module.exports = app



