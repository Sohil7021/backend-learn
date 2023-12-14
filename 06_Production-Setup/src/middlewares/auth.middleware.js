import { User } from "../models/user.models";
import { apiError } from "../utils/apiError";
import { asynchandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken"

export const verifyJWT = asynchandler(async(req,res,next) => {
   try {
    const token =  req.cookies?.accesss || req.header("Authorization")?.replace("Bearer ", "")
 
    if(!token) {
     throw new apiError(401,"Unauthorized Token")
    }
 
   const decodeToken =  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
 
  const user =  await User.findById(decodeToken?._id).select("-password -refresh")
 
  if(!user) {
     // Discuss
     throw new apiError(401,"Invalid Access Token")
  }
 
  req.user = user;
  next()
   } catch (error) {
    throw new apiError(401,error?.message || "Invalid access token")
   }


})