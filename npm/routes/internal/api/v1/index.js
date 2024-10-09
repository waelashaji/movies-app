import { Router } from "express";
import asyncHandler from "express-async-handler";
import ReviewController from "#controllers/reviewController/index";

const router = Router();

router.get("/review/:movie_id", asyncHandler(ReviewController.getMany));
router.post("/review", asyncHandler(ReviewController.create));

export default router;
