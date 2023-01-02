import express from "express";
import { signUp, signIn, accessToken } from "../controllers/AuthControllers.js";


const router = express.Router();

router.post('/signup',signUp);
router.post('/signin',signIn);
router.post('/accesstoken',accessToken);

export default router;