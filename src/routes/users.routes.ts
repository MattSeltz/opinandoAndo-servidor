import { Router } from "express";

import { authMiddleware } from "../middlewares/auth";

import {
	addPost,
	deleteData,
	deletePost,
	getData,
	getOneData,
	putData,
} from "../controllers/users.controllers";

const router = Router();

router.get("/", getData);
router.get("/:id", getOneData);
router.put("/:id", authMiddleware, putData);
router.delete("/:id", authMiddleware, deleteData);
router.put("/addPost/:id", authMiddleware, addPost);
router.delete("/deletePost/:id", authMiddleware, deletePost);

export default router;
