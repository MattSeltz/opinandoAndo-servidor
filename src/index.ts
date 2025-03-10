import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { ORIGIN, PORT } from "./configs/configs";

import { db } from "./db/mongoose";

import { authMiddleware } from "./middlewares/auth";

import usersRoutes from "./routes/users.routes";
import postsRoutes from "./routes/posts.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

app.disable("x-powered-by");

app.use(express.json());
app.use(
	cors({
		origin: ORIGIN,
		credentials: true,
	})
);
app.use(cookieParser());

app.use("/users", authMiddleware, usersRoutes);
app.use("/posts", authMiddleware, postsRoutes);
app.use("/auth", authRoutes);

app.get("/", (_, res) => {
	res.send(`<h1>XYZ</h1>`);
});

app.listen(PORT, async () => {
	await db();
	console.log(`Servidor corriendo en el puerto ${PORT}`);
});
