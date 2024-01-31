import { Router } from "express";

import { registerAuth, login , getMe} from "../controllers/registerAuth.js";
import { cheskAuth } from "../utils/chekAuth.js";

const router = new Router();

router.post('/register', registerAuth);

router.post('/login', login);

router.get('/getme', cheskAuth, getMe)
 
export default router;