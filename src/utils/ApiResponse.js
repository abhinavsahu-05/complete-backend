/*
Purpose of this file-

ApiResponse.js file isliye banate hain taaki backend se har successful response ek hi format mein bhej sake.
Jaise login successful ho, toh har baar manually response structure likhne ke bajaye ek standard format use kar sakein: statusCode, data, message aur success: true.
*/

class ApiResponse{
    constructor(statusCode, data, message = "Success"){

        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}

export {ApiResponse}