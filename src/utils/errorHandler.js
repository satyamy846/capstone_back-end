class CustomError extends Error {
    constructor(message, statuscode, name) {
        super(message)
        this.statuscode = statuscode
        this.name = name
    }
    // static alreadyExist(message, statuscode, name) {
    //     return new CustomError(message, statuscode, name)
    // }
}

export default CustomError;