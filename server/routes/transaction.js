import { Router } from "express";

import { cheskAuth } from "../utils/chekAuth.js";
import { transactionCard } from "../controllers/Transaction.js";
import { getMe } from "../controllers/registerAuth.js";
const router = new Router();

router.post('/card', cheskAuth, transactionCard);

export default router;