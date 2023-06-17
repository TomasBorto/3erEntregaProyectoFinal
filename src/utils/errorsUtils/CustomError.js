class CustomeError {
    static createError({name='Error', cause, message, code=1}){
        let error = new Error(message)
        error.name = name
        error.code = code
        error.cause = cause
        console.log(error)
        throw error
    }
}

module.exports = CustomeError