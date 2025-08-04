import { courseController } from "../controller/course.controller.js";
import { verifyToken } from "../../../shared/middleware/verifyToken.js";
import { Router } from "express";
import { asyncHandler } from "../../../libs/core/handlers/async.handlers.js";
const router = Router();
const controller = new courseController();

router.post("/" ,asyncHandler(async(req , res , next)=>{
    await controller.create(req , res , next)
}))

router.get("/get" ,  asyncHandler(async(req , res)=>{
    await controller.getAll(req , res);
}))

router.get("/minPrice" , asyncHandler(async(req , res)=>{
    await controller.getMinPrice(req , res)
}))

router.get("/userPrice" , asyncHandler(async(req  , res)=>{
    await controller.getMinUserPerPrice(req , res)
}))

router.get("/sum" , asyncHandler(async(req , res)=>{
    await controller.getAllAgreecateUserPerPrice(req , res)
}))

export const courseRouter = router;