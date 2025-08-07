import { enrollmentController } from "../controller/enrollment.controller.js";
import { Router } from "express";
import { asyncHandler } from "../../../libs/core/handlers/async.handlers.js";
import { verifyToken } from "../../../shared/middleware/verifyToken.js";

const router = Router()
const controller = new enrollmentController()

router.post("/create" ,asyncHandler(async(req , res , next)=>{
    await controller.create(req , res , next)
}))

router.get("/" , asyncHandler(async(req , res)=>{
    await controller.getAll(req , res)
}))

router.get("/average" , asyncHandler(async(req , res)=>{
    await controller.getAllAverage(req , res)
}))

export const enrollmentRouter = router;