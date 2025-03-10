import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../configs/configs";

interface AuthRequest extends Request {
	user?: string | jwt.JwtPayload;
}

export const authMiddleware = (
	req: AuthRequest,
	res: Response,
	next: NextFunction
) => {
	const { token } = req.cookies;
	if (!token) throw new Error("Acceso denegado, token no proporcionado");

	try {
		const decoded = jwt.verify(token, JWT_SECRET as string);
		req.user = decoded;
		next();
	} catch (error) {
		res.status(400).json(error ? error : { message: "Token inválido" });
	}
};
