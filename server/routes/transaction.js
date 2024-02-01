import { Router } from "express";

import { cheskAuth } from "../utils/chekAuth.js";
import { transactionCard , getUser} from "../controllers/Transaction.js";
import { getMe } from "../controllers/registerAuth.js";
const router = new Router();

router.post('/card', cheskAuth, transactionCard);

router.post('/user', getUser)

export default router;