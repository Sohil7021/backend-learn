import {asyncHandler} from "../utils/asyncHandler"
import apiError from "../utils/apiError"
import {User} from "../models/user.models.js"
import { uploadCloudinary } from "../utils/cloudinary.js"
import { apiResponse } from "../utils/apiResponce.js"

const generateAccessRefreshToken = async(userId) =>  {
    try {
        await User.findById(userId)
      const accesss =   user.generateAccessToken()
      const refersh =   user.generateRefreshToken()

      user.refersh = refersh
   await  user.save({validateBeforeSave:false})

   return {accesss,refersh}
        
    } catch (error) {
        throw new apiError(500, "Somthing went wrong in Token")
    }
}

const registerUser = asyncHandler(async(req,res) => {
    // get user detail from fronted
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refersh token field from response
    // check for user creation
    // return res




    

// get user detail from fronted

    const {fullname,email,username,password} = req.body

    // if(fullname === "") {
    //     throw new apiError(400,"fullname is required")
    // }


// validation - not empty

    if(
        [fullname,email,username,password].some((field) => 
            field?.trim() === ""
        )
    ) {
        throw new apiError(400,"All field are required")
    }


// check if user already exists: username, email

   const existedUser = await  User.findOne({
        $or: [{username}, {email}]
    })

    if(existedUser) {
        throw new apiError(409,"User with username and email already exist")
    }


// check for images, check for avatar

   const avatarLocalPath =  req.files?.avatar[0]?.path
     
//    const coverImageLocalPAth =  req.files?.coverImage[0]?.path;

   let coverImageLocalPAth;
   if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
    coverImageLocalPAth = req.files.coverImage[0].path
   }

     if(!avatarLocalPath) {
        throw new apiError(400,"Avatar file is required")
     }

// upload them to cloudinary, avatar

    const avatar =  await uploadCloudinary(avatarLocalPath)
     const coverImage = await uploadCloudinary(coverImageLocalPAth)

     if(!avatar) {
        throw new apiError(400,"Avatar file is required")
     }


// create user object - create entry in db

  const user =  await  User.create({
        fullname,
        avatar : avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
     })



// remove password and refersh token field from response

    const createdUser =  await User.findById(user._id).select(
        "-password -refershToken" 
    )

    // check for user creation

    if(!createdUser) {
        throw new apiError(500),"Something went wrong by user while registering"
    }



// return res

    return res.status(201).json(
        new apiResponse(200,createdUser,"User registerd successfully")
    )

})


// Login user
const loginUser = asyncHandler(async (req,res) => {
    // req body -> data
    // username or email
    //find the user
    //password check
    //access and refresh token
    // send cookie

    const {email,username,passowrd} = req.body

    if(!username || !email) {
        throw new apiError(400, "username or email is required")
    }
    
  const user =  await  User.findOne({
        $or:[{username}, {email}]
    })

    if(!user) {
        throw new apiError(404,"User does not exist")
    }

   const isPasswordValid =  await user.isPasswordCorrect(password)

   if(!isPasswordValid) {
    throw new apiError(401, "Invalid user credentials")
   }
       const {accesss,refersh} =  await  generateAccessRefreshToken(user._id)

      const loggedUser =  User.findById(user._id).select("-password -refreshToken")

      const options = {
        httpOnly: true,
        secure: true
      }



      return res.status(200)
      .cookie("access",accesss,options)
      .cookie("refersh",refersh,options)
      .json(
        new apiResponse(
            200,
            {user: loggedUser,accesss,refersh},
            "User logged In Successfully"

        )
      )



})

// Logout User

const logoutUser = asyncHandler (async(req,res) => {
    //  Middleware concept in logout 
   User.findByIdAndUpdate(
    req.user._id,{
        $set: {
            refreshToken: undefined
        },


        
    },
    {
        new: true
    }

    
   )
   const options = {
    httpOnly: true,
    secure: true
  }

  return res
  .status(200)
  .clearCookie("Accesss",option)
  .clearCookie("refresh",option)
  .json(new apiResponse(200,{},"USer logged out"))
})







export {registerUser,
loginUser,
logoutUser}