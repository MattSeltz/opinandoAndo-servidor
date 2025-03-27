import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { ORIGIN, PORT } from "./configs/configs";

import { db } from "./db/mongoose";

import usersRoutes from "./routes/users.routes";
import postsRoutes from "./routes/posts.routes";
import authRoutes from "./routes/auth.routes";
import emailRoutes from "./routes/email.routes";

const app = express();

app.set('trust proxy', 1);

app.disable("x-powered-by");

app.use(express.json());
app.use(
	cors({
		origin: ORIGIN,
		credentials: true,
	})
);
app.use(cookieParser());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Credentials", "true");
	next();
});

app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);
app.use("/auth", authRoutes);
app.use("/email", emailRoutes);

app.get("/", (_, res) => {
	res.send(`<h1>XYZ</h1>`);
});

app.listen(PORT, async () => {
	await db();
	console.log(`Servidor corriendo en el puerto ${PORT}`);
});
