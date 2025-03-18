import { Router } from "express";

import { authMiddleware } from "../middlewares/auth";

import {
	deleteData,
	getData,
	getOneData,
	postData,
	putData,
	voteData,
} from "../controllers/posts.controllers";

const router = Router();

router.get("/", getData);
router.get("/:id", getOneData);
router.post("/", authMiddleware, postData);
router.put("/:id", authMiddleware, putData);
router.delete("/:id", authMiddleware, deleteData);
router.put("/vote/:id", authMiddleware, voteData);

export default router;
