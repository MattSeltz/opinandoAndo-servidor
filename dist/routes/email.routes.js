"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const email_1 = require("../email/email");
const router = (0, express_1.Router)();
router.post("/", email_1.sendPasswordResetEmail);
router.post("/match", email_1.isMatch);
router.post("/user", email_1.getDataByEmail);
exports.default = router;
