import { Router } from "express";

import { authMiddleware } from "../middlewares/auth";

import {
	deleteData,
	getData,
	getOneData,
	putData,
} from "../controllers/users.controllers";

const router = Router();

router.get("/", getData);
router.get("/:id", getOneData);
router.put("/:id", authMiddleware, putData);
router.delete("/:id", authMiddleware, deleteData);

export default router;
