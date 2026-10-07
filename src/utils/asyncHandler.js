/*
Purpose of this file ->

asyncHandler ka kaam hai us error ko pakadkar next(error) se error-handling middleware tak pahunchana, taaki server ko har controller mein alag se error handle na karna pade.

Yaad rakhna bhai: ApiError error ki details deta hai, aur asyncHandler error ko aage pahunchata hai. 
 */



const asyncHandler = (requestHandler)=>{
    return (req, res, next)=>{
        Promise.resolve(requestHandler(req, res, next)).
        catch((error)=> next(error))
    }

}
export{asyncHandler}












// const asyncHandler = (fn)=> async(req, res, next)=>{
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.error(error.code || 500).json({
//             success:false,
//             message: err.message
//         })
        
//     }
// }

// export {asyncHandler}