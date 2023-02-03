const mongoose = require("mongoose")



function startDatabase(databaseUri){
    return mongoose.connect(databaseUri,{
        useUnifiedTopology:true,
        useNewUrlParser: true
    })
}

module.exports = startDatabase