import { Router } from "express";

import { authMiddleware } from "../middlewares/auth";

import {
	deleteData,
	getData,
	getOneData,
	postData,
	putData,
} from "../controllers/posts.controllers";

const router = Router();

router.get("/", getData);
router.get("/:id", getOneData);
router.post("/", authMiddleware, postData);
router.put("/:id", authMiddleware, putData);
router.delete("/:id", authMiddleware, deleteData);

export default router;
