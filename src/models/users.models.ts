import { Schema, model, Document, Types } from "mongoose";

interface IUser extends Document {
	username: string;
	password: string;
	email: string;
	posts: Types.ObjectId[];
}

const userSchema = new Schema<IUser>(
	{
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
		posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
	},
	{ timestamps: true }
);

export const User = model<IUser>("User", userSchema);
