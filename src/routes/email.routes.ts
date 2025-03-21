import { Router } from "express";

import {
	sendPasswordResetEmail,
	getDataByEmail,
	isMatch,
} from "../email/email";

const router = Router();

router.post("/", sendPasswordResetEmail);
router.post("/match", isMatch);
router.post("/user", getDataByEmail);

export default router;
