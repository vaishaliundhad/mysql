import { assignmentController } from "../controller/assignment.controller.js";
import { asyncHandler } from "../../../libs/core/handlers/async.handlers.js";
import { Router } from "express";

const router = Router()
const controller = new assignmentController()

router.post("/" , asyncHandler(async(req , res)=>{
    controller.create(req , res)
}))

router.get("/" , asyncHandler(async(req , res)=>{
    controller.getAll(req , res)
}))

export const assignmentRouter = router