import { Router } from "express";

import {
	deleteData,
	getData,
	getOneData,
	putData,
} from "../controllers/users.controllers";

const router = Router();

router.get("/", getData);
router.get("/:id", getOneData);
router.put("/:id", putData);
router.delete("/:id", deleteData);

export default router;
