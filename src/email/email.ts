import { Request, Response } from "express";
import crypto from "crypto";

import { User } from "../models/users.models";

import { transporter } from "../configs/nodemailer";

let code = "";

export const sendPasswordResetEmail = async (req: Request, res: Response) => {
	const { to } = req.body;

	const randCode = crypto.randomUUID({ disableEntropyCache: true });
	code = randCode;

	const mailOptions = {
		from: '"Soporte" <OpinandoAndo.corp@gmail.com>',
		to,
		subject: "Restablece tu contraseña",
		html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; color: #333;">
    <div style="width: 100%; max-width: 600px; margin: auto; background-color: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <div style="background-color: #395974; text-align: center; padding: 20px; color: white; font-size: 24px;">
            <strong>Restablecer Contraseña</strong>
        </div>
        <div style="padding: 20px; font-size: 16px; line-height: 1.5; color: #555;">
            <p>Hola,</p>
            <p>Has solicitado restablecer tu contraseña. Copia y pega en el navegador el siguiente código para continuar:</p>
            <p style="font-weight: bold; font-size: 18px; color: #395974; background-color: #f0f0f0; padding: 10px; border-radius: 4px;">
                ${randCode}
            </p>
            <p>Si no solicitaste esto, ignora este correo.</p>
        </div>
    </div>

    <footer style="text-align: center; margin-top: 30px; font-size: 12px; color: #777;">
        <p>&copy; 2025 OpinandoAndo. Todos los derechos reservados.</p>
    </footer>
</div>
    `,
	};

	try {
		await transporter.sendMail(mailOptions);
		console.log("Correo enviado con éxito a:", to);
		res.json({ message: "OK!" });
	} catch (error) {
		res.status(500).json({ error: "Error al enviar el correo" });
	}
};

export const isMatch = (req: Request, res: Response) => {
	const { id } = req.body;

	if (code === id) {
		res.json({ message: "OK!" });
	} else {
		res.status(400).json({ error: "Código invalido" });
	}
};

export const getDataByEmail = async (req: Request, res: Response) => {
	const { email } = req.body;

	try {
		const user = await User.findOne({ email });

		if (user) {
			res.json(user);
		} else {
			res.status(400).json({ error: "Usuario no encontrado" });
		}
	} catch (error) {
		res.status(500).json({ error: "Error al buscar el usuario" });
	}
};
