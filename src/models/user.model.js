import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },

    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    fullName:{
        type: String,
        required: true,
        trim: true,
        index: true
    },

    avatar:{
        type: String, //cloudinary url
        required: true
    },

    coverImage: {
         type: String //cloudinary url
    },

    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],

    password: {
        type: String,
        required: [true, 'Password is required']
    },

    refreshToken: {
        type: String
    }







}, {timestamps: true})

userSchema.pre("save", function(next){  // pre-> hook, save-> event
    if(!this.isModified("password"))  return next(); // check krta h agar kuchh modify nhi hua to return kr jao
    this.password = bcrypt.has(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password, this.password)   
}

// in dono methods ke pass database me saved data ka access h

userSchema.methods.generateAccessToken = function(){  // ye ek jwt token h
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName

    },
    process.env.ACCESS_TOKEN_SECRET, 
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)

}

userSchema.methods.generateRefreshToken = function(){  // ye bhi ek jwt token h, bas usage sba differently hoga
    return jwt.sign(
        {
            _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET, 
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)


}

export const User = mongoose.model("user", userSchema)