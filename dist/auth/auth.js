"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recovery = exports.logout = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configs_1 = require("../configs/configs");
const users_models_1 = require("../models/users.models");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email, date, sex, country } = req.body;
    try {
        const existingUser = yield users_models_1.User.findOne({ email });
        if (existingUser)
            throw new Error("El usuario ya existe");
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const user = new users_models_1.User({
            username,
            password: hashedPassword,
            email,
            date,
            sex,
            country,
        });
        yield user.save();
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield users_models_1.User.findOne({ email });
        if (!user)
            throw new Error("Credenciales inválidas");
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            throw new Error("Credenciales inválidas");
        const token = jsonwebtoken_1.default.sign({ id: user._id }, configs_1.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.cookie("token", token, {
            httpOnly: true,
            secure: configs_1.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 3600000,
        });
        res.cookie("userId", `${user._id}`, {
            httpOnly: true,
            secure: configs_1.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 3600000,
        });
        res.json({ message: "Login exitoso", id: user._id });
    }
    catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
});
exports.login = login;
const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: configs_1.NODE_ENV === "production",
        sameSite: "none",
    });
    res.clearCookie("userId", {
        httpOnly: true,
        secure: configs_1.NODE_ENV === "production",
        sameSite: "none",
    });
    res.json({ message: "Sesión cerrada correctamente" });
};
exports.logout = logout;
const recovery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = req.body;
    const { id } = req.params;
    try {
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        yield users_models_1.User.findByIdAndUpdate(id, { password: hashedPassword });
        res.status(201).json({ message: "Contraseña registrada con éxito" });
    }
    catch (error) {
        res.status(500).json({ error: "Error al registrar la contraseña" });
    }
});
exports.recovery = recovery;
