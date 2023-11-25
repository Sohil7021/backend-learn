import mongoose,{Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({
    username: {
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email: {
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        
    },
    fullname: {
        type:String,
        required:true,
        trim:true,
        index:true
        
    },
    avatar: {
         type:String, // Cloudinary URL
         required:true
    },
    coverImage: {
        type:String
    },
    watchHistory: [
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password: {
        type:String,
        required:[true,'Password is required']
    },
    refreshToken:{
        type:String,
    }
},{timestamps:true})


// For password incryption
userSchema.pre("save", async function(next) {
    if(this.isModified("password")) return next() // Negative check

    this.password = bcrypt.hash(this.password,10)
    next()
})

// For checking password
userSchema.method.isPasswordCorrect = async function(password) {
   return await bcrypt.compare(password,this.password)
}

// For incryption start process with help of Tokens
// Taking from .env file -> Tokens
userSchema.methods.generateAccessToken = function(){
   return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.userSchema,
        fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
    
    )
}
userSchema.methods.gerenateRefreshToken = function(){
    return jwt.sign({
        _id:this._id,
        
    },
    process.env.REFRESH_TOKEN_SECRECT,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
    
    )
}

export const User = mongoose.model("User",userSchema)