import { Schema, model, Document, Types } from "mongoose";

interface IUser extends Document {
	username: string;
	password: string;
	email: string;
	date: string;
	sex: string;
	country: string;
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
		posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
	},
	{ timestamps: true }
);

export const User = model<IUser>("User", userSchema);
