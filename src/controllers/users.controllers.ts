import { Request, Response } from "express";

import { User } from "../models/users.models";

export const getData = async (req: Request, res: Response) => {
	try {
		const user = await User.find().populate({
			path: "posts",
			populate: "author",
		});
		res.json(user);
	} catch (error) {
		console.error(error);
		res.status(400).json(error);
	}
};

export const getOneData = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const user = await User.findById(id).populate({
			path: "posts",
			populate: "author",
		});
		res.json(user);
	} catch (error) {
		console.error(error);
		res.status(400).json(error);
	}
};

export const putData = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { username, password, email } = req.body;

	try {
		const user = await User.findByIdAndUpdate(
			id,
			{ username, password, email },
			{ new: true }
		);
		res.json(user);
	} catch (error) {
		console.error(error);
		res.status(400).json(error);
	}
};

export const deleteData = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const user = await User.findByIdAndDelete(id);
		res.json(user);
	} catch (error) {
		console.error(error);
		res.status(400).json(error);
	}
};

export const addPost = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { postId } = req.body;

	try {
		const user = await User.findByIdAndUpdate(
			id,
			{ $push: { posts: postId } },
			{ new: true }
		);
		res.json(user);
	} catch (error) {
		console.error(error);
		res.status(400).json(error);
	}
};

export const deletePost = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { postId } = req.body;

	try {
		const user = await User.findByIdAndUpdate(
			id,
			{ $pull: { posts: postId } },
			{ new: true }
		);
		res.json(user);
	} catch (error) {
		console.error(error);
		res.status(400).json(error);
	}
};
