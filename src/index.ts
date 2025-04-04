import express from "express";
import cookieParser from "cookie-parser";

import { PORT } from "./configs/configs";

import { db } from "./db/mongoose";

import usersRoutes from "./routes/users.routes";
import postsRoutes from "./routes/posts.routes";
import authRoutes from "./routes/auth.routes";
import emailRoutes from "./routes/email.routes";

const app = express();

app.disable("x-powered-by");

app.use(express.json());
app.use(cookieParser());

app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);
app.use("/auth", authRoutes);
app.use("/email", emailRoutes);

app.get("/", (_, res) => {
	res.send(`<h1>OpinandoAndo</h1>`);
});

app.listen(PORT, async () => {
	await db();
	console.log(`Servidor corriendo en el puerto ${PORT}`);
});
