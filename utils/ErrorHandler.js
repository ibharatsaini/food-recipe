class ErrorHandler extends Error{
    constructor(statusCode,message){
        super(message)
        this.code = statusCode
        Error.captureStackTrace(this,this.code)
    }
}

module.exports = ErrorHandler