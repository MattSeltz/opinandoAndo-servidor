import { connect } from "mongoose";

import { MONGODB_KEY } from "../configs/configs";

export const db = async () => {
	try {
		await connect(MONGODB_KEY as string);
		console.log("Conectado a MongoDB");
	} catch (error) {
		console.error(error);
	}
};
