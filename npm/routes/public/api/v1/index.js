import { Router } from "express";
import asyncHandler from "express-async-handler";
import PublicController from "#controllers/publicController/index";

const router = Router();

router.get("/movies", asyncHandler(PublicController.getMovies));
router.get("/movies/:id", asyncHandler(PublicController.getMovieById));

export default router;
