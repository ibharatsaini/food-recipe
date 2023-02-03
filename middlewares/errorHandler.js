const errorHandler =(err,req,res,next)=>{
    console.log(err)
    err.code = err.code || 500
    err.message = err.message || `Internal Server Error`
    

    return res.status(err.code)
                    .json({
                        success:false,
                        error:err.message
                    })
}

module.exports = errorHandler