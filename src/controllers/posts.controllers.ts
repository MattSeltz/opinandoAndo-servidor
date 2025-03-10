import { Request, Response } from "express";

import { Post } from "../models/posts.models";

export const getData = async (req: Request, res: Response) => {
	try {
		const post = await Post.find().populate(["author", "likes", "disLikes"]);
		res.json(post);
	} catch (error) {
		console.error(error);
		res.status(400).json(error);
	}
};

export const getOneData = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const post = await Post.findById(id).populate([
			"author",
			"likes",
			"disLikes",
		]);
		res.json(post);
	} catch (error) {
		console.error(error);
		res.status(400).json(error);
	}
};

export const postData = async (req: Request, res: Response) => {
	const { title, body, author } = req.body;

	try {
		const post = new Post({ title, body, author });
		await post.save();
		res.json(post);
	} catch (error) {
		console.error(error);
		res.status(400).json(error);
	}
};

export const putData = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { title, body, author } = req.body;

	try {
		const post = await Post.findByIdAndUpdate(
			id,
			{ title, body, author },
			{ new: true }
		);
		res.json(post);
	} catch (error) {
		console.error(error);
		res.status(400).json(error);
	}
};

export const deleteData = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const post = await Post.findByIdAndDelete(id);
		res.json(post);
	} catch (error) {
		console.error(error);
		res.status(400).json(error);
	}
};
