/*
Purpose of this file ->

 Maan lo user login karta hai, lekin password galat hai. Hume error ke saath status code (401) aur message (Invalid password) bhi bhejna hai.
ApiError ek custom error banane ka tarika hai, jisme hum error ki details ek jagah store kar dete hain.

Yaad rakhna bhai: ApiError error ki details deta hai, aur asyncHandler error ko aage pahunchata hai. 
 */


class ApiError extends Error{
    constructor(
        statusCode,
        message = 'Something went wrong',
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.message = message
        this.success = false
        this.errors = errors

        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }

    }
}

export {ApiError}