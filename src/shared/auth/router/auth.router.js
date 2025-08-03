import { Router } from "express";
import { asyncHandler } from "../../../libs/core/handlers/async.handlers.js";
import { AuthController } from "../controller/auth.controller.js";

const controller = new AuthController()
const router = Router()

router.post("/signUp" , asyncHandler(async (req , res , next)=>{
    await controller.create(req ,res , next)
}))
router.post("/login", asyncHandler(async(req , res , next)=>{
    await controller.login(req , res , next)
}))
router.post("/verfyOtp" , asyncHandler(async(req , res , next)=>{
    await controller.verifyOtp(req ,res , next)
}))

router.post("/forgetPassword" , asyncHandler(async(req , res, next)=>{
    await controller.forgotPasswordRequestOTP(req , res , next)
}))
router.post("/resetPassword" , asyncHandler(async(req , res, next)=>{
    await controller.forgotPasswordReset(req , res , next)
}))
router.put("/password/:id" , asyncHandler(async(req , res, next)=>{
    await controller.updatedPassword(req , res , next)
}))
export const authRouter = router