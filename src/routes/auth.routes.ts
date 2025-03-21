import { Router } from "express";

import { register, login, logout, recovery } from "../auth/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.put("/recovery/:id", recovery);

export default router;
