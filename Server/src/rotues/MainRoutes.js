import express from "express";
import recommendMovies from "../controller/recommendMovies.js";

const router=express.Router();

router.post('/recommend',recommendMovies);

export default router;