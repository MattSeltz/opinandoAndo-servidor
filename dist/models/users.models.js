"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: String,
        required: true,
    },
    sex: {
        type: String,
        enum: ["Masculino", "Femenino"],
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    posts: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Post" }],
}, { timestamps: true });
exports.User = (0, mongoose_1.model)("User", userSchema);
