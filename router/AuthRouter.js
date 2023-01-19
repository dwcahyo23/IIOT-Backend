import express from 'express';
import {
  signUp, signIn, accessToken, updateApp,
} from '../controllers/AuthControllers.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/accesstoken', accessToken);
router.post('/updateapp', updateApp);

export default router;
