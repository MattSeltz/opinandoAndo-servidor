import { Router } from "express";

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
router.post("/", postData);
router.put("/:id", putData);
router.delete("/:id", deleteData);

export default router;
