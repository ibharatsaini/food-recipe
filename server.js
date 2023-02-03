const app = require("./app")
const startDatabase = require("./utils/database")


const PORT = process.env.PORT || 8080
const DATABASE_URI = process.env.DATABASE_URI
console.log(DATABASE_URI)
app.listen(PORT,()=>{
    console.log(`Server started at: ${PORT}`)
    startDatabase(DATABASE_URI)
        .then(data=>{
            console.log(`Database connect at: ${data.connectioin.host}`)
        })
        .catch(e=>console.log(e))

})


process.on('unhandledRejection',(err)=>{
    console.log(err)

})

process.on("uncaughtException", (err) => {
    console.log(`Error: ${err}`);
   
});