import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { JWT_SECRET, NODE_ENV } from "../configs/configs";

import { User } from "../models/users.models";

export const register = async (req: Request, res: Response) => {
	const { username, password, email, date, sex, country } = req.body;

	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) throw new Error("El usuario ya existe");

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = new User({
			username,
			password: hashedPassword,
			email,
			date,
			sex,
			country,
		});
		await user.save();
		res.json(user);
	} catch (error) {
		console.error(error);
		res.status(400).json(error);
	}
};

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) throw new Error("Credenciales inválidas");

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) throw new Error("Credenciales inválidas");

		const token = jwt.sign({ id: user._id }, JWT_SECRET as string, {
			expiresIn: "1h",
		});
		res.cookie("token", token, {
			httpOnly: true,
			secure: NODE_ENV === "production",
			sameSite: "strict",
			path: "/",
		});
		res.cookie("userId", `${user._id}`, {
			httpOnly: true,
			secure: NODE_ENV === "production",
			sameSite: "strict",
			path: "/",
		});
		res.json({ message: "Login exitoso", id: user._id });
	} catch (error) {
		console.error(error);
		res.status(400).json(error);
	}
};

export const logout = (req: Request, res: Response) => {
	res.clearCookie("token", {
		httpOnly: true,
		secure: NODE_ENV === "production",
		sameSite: "strict",
		path: "/",
	});
	res.clearCookie("userId", {
		httpOnly: true,
		secure: NODE_ENV === "production",
		sameSite: "strict",
		path: "/",
	});
	res.json({ message: "Sesión cerrada correctamente" });
};

export const recovery = async (req: Request, res: Response) => {
	const { password } = req.body;
	const { id } = req.params;

	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		await User.findByIdAndUpdate(id, { password: hashedPassword });
		res.status(201).json({ message: "Contraseña registrada con éxito" });
	} catch (error) {
		res.status(500).json({ error: "Error al registrar la contraseña" });
	}
};
