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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.addPost = exports.deleteData = exports.putData = exports.getOneData = exports.getData = void 0;
const users_models_1 = require("../models/users.models");
const getData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_models_1.User.find().populate({
            path: "posts",
            populate: "author",
        });
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
});
exports.getData = getData;
const getOneData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield users_models_1.User.findById(id).populate({
            path: "posts",
            populate: "author",
        });
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
});
exports.getOneData = getOneData;
const putData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { username, email, date, sex, country } = req.body;
    try {
        const user = yield users_models_1.User.findByIdAndUpdate(id, { username, email, date, sex, country }, { new: true });
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
});
exports.putData = putData;
const deleteData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield users_models_1.User.findByIdAndDelete(id);
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
});
exports.deleteData = deleteData;
const addPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { postId } = req.body;
    try {
        const user = yield users_models_1.User.findByIdAndUpdate(id, { $push: { posts: postId } }, { new: true });
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
});
exports.addPost = addPost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { postId } = req.body;
    try {
        const user = yield users_models_1.User.findByIdAndUpdate(id, { $pull: { posts: postId } }, { new: true });
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
});
exports.deletePost = deletePost;
