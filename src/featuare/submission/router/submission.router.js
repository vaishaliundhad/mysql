import { asyncHandler } from "../../../libs/core/handlers/async.handlers.js";
import { submissionController } from "../controller/submission.controller.js";
import { Router } from "express";

const router = Router()
const controller = new submissionController()

router.post("/" , asyncHandler(async(req , res)=>{
    controller.create(req , res)
}))

router.get("/" , asyncHandler(async(req , res)=>{
    controller.getAll(req , res)
}))

export const submissionRouter = router