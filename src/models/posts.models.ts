import { Schema, model, Document, Types } from "mongoose";

interface IPost extends Document {
	title: string;
	body: string;
	date: string;
	author: Types.ObjectId;
	acuerdo: Types.ObjectId[];
	desacuerdo: Types.ObjectId[];
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
		date: {
			type: String,
			required: true,
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		acuerdo: [{ type: Schema.Types.ObjectId, ref: "User" }],
		desacuerdo: [{ type: Schema.Types.ObjectId, ref: "User" }],
	},
	{ timestamps: true }
);

export const Post = model<IPost>("Post", postSchema);
