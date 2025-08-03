import { courseController } from "../controller/course.controller.js";
import { verifyToken } from "../../../shared/middleware/verifyToken.js";
import { Router } from "express";
import { asyncHandler } from "../../../libs/core/handlers/async.handlers.js";
const router = Router();
const controller = new courseController();

router.post("/" , verifyToken , asyncHandler(async(req , res)=>{
    await controller.create(req , res)
}))

export const courseRouter = router;