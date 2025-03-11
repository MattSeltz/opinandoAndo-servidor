"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configs_1 = require("../configs/configs");
const authMiddleware = (req, res, next) => {
    const { token } = req.cookies;
    if (!token)
        throw new Error("Acceso denegado, token no proporcionado");
    try {
        const decoded = jsonwebtoken_1.default.verify(token, configs_1.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(400).json(error ? error : { message: "Token inválido" });
    }
};
exports.authMiddleware = authMiddleware;
