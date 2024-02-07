import { Router } from "express";

import { registerAuth, login, getMe, getMoreTransaction } from "../controllers/registerAuth.js";
import { cheskAuth } from "../utils/chekAuth.js";

const router = new Router();

router.post('/register', registerAuth);

router.post('/login', login);

router.post('/getmore', getMoreTransaction)

router.get('/getme', cheskAuth, getMe)


export default router;