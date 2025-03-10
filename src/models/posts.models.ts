import { Schema, model, Document, Types } from "mongoose";

interface IPost extends Document {
	title: string;
	body: string;
	author: Types.ObjectId;
	likes: Types.ObjectId[];
	disLikes: Types.ObjectId[];
}

const postSchema = new Schema<IPost>(
	{
		title: {
			type: String,
			required: true,
		},
		body: {
			type: String,
			required: true,
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
		disLikes: [{ type: Schema.Types.ObjectId, ref: "User" }],
	},
	{ timestamps: true }
);

export const Post = model<IPost>("Post", postSchema);
