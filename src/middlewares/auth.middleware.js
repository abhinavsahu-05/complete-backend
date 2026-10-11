import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from 'jsonwebtoken'
import { User } from "../models/user.model.js";

// Ek line mein: AuthMiddleware token verify karta hai, user ko identify karta hai aur request ko aage jaane deta hai agar verification successful ho.


// Login controller: College ne teri ID verify karke tujhe ID card de diya.
// AuthMiddleware: Jab bhi tu agle din library aata hai, guard tera ID card check karta hai.


export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // STEP 1: Request se access token nikaalo.
    // Pehle cookies check hongi.
    // Cookie mein token nahi mila, toh Authorization header check hoga.
    // "Bearer " hata kar sirf token nikaal lenge.
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    // STEP 2: Check karo ki token mila ya nahi.
    // Token nahi mila, toh user authenticated nahi hai.
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    // STEP 3: Token verify karo.
    // Secret key se check hoga ki token valid hai,
    // expire toh nahi hua aur uske saath chhedchhad toh nahi hui.
    // Valid hone par decodedToken mein payload milega.
    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    // STEP 4: Token se user ki ID nikaalo.
    // Database mein us ID wala user find karo.
    // Password aur refreshToken ko returned object se hata do.
    const user = await User.findById(decodedToken?._id)
      .select("-password -refreshToken");

    // STEP 5: Check karo ki database mein user mila ya nahi.
    // User nahi mila, toh request ko aage mat bhejo.
    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }

    // STEP 6: User ko request object mein attach kar do.
    // Ab agla controller req.user se user ka data le sakta hai.
    req.user = user;

    // STEP 7: Authentication successful!
    // Express ko bolo ki ab agla middleware/controller chalao.
    next();

  } catch (error) {
    // STEP 8: Error ko Express ke error handler tak bhejo.
    // Token invalid/expired ho toh 401 response milna chahiye.
    throw new ApiError(
      401,
      error?.message || "Invalid access token"
    );
  }
});
