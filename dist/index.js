"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const configs_1 = require("./configs/configs");
const mongoose_1 = require("./db/mongoose");
const auth_1 = require("./middlewares/auth");
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const posts_routes_1 = __importDefault(require("./routes/posts.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const app = (0, express_1.default)();
app.disable("x-powered-by");
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: configs_1.ORIGIN,
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use("/users", auth_1.authMiddleware, users_routes_1.default);
app.use("/posts", auth_1.authMiddleware, posts_routes_1.default);
app.use("/auth", auth_routes_1.default);
app.get("/", (_, res) => {
    res.send(`<h1>XYZ</h1>`);
});
app.listen(configs_1.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoose_1.db)();
    console.log(`Servidor corriendo en el puerto ${configs_1.PORT}`);
}));
