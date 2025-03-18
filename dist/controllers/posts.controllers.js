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
exports.voteData = exports.deleteData = exports.putData = exports.postData = exports.getOneData = exports.getData = void 0;
const posts_models_1 = require("../models/posts.models");
const getData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield posts_models_1.Post.find().populate([
            "author",
            "acuerdo",
            "desacuerdo",
        ]);
        res.json(post);
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
        const post = yield posts_models_1.Post.findById(id).populate([
            "author",
            "acuerdo",
            "desacuerdo",
        ]);
        res.json(post);
    }
    catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
});
exports.getOneData = getOneData;
const postData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, body, author, date } = req.body;
    try {
        const post = new posts_models_1.Post({ title, body, author, date });
        yield post.save();
        res.json(post);
    }
    catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
});
exports.postData = postData;
const putData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, body, author, date } = req.body;
    try {
        const post = yield posts_models_1.Post.findByIdAndUpdate(id, { title, body, author, date }, { new: true });
        res.json(post);
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
        const post = yield posts_models_1.Post.findByIdAndDelete(id);
        res.json(post);
    }
    catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
});
exports.deleteData = deleteData;
const voteData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { userId, type } = req.body;
    try {
        const post = yield posts_models_1.Post.findByIdAndUpdate(id, { $push: { [type]: userId } }, { new: true });
        res.json(post);
    }
    catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
});
exports.voteData = voteData;
