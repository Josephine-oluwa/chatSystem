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
const http_1 = __importDefault(require("http"));
const Db_1 = require("./config/Db");
const mainApp_1 = require("./mainApp");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const amqplib_1 = __importDefault(require("amqplib"));
const notifyModel_1 = __importDefault(require("./model/notifyModel"));
const port = 6622;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, mainApp_1.mainApp)(app);
server.listen(port, () => {
    console.log("server is connected");
    (0, Db_1.mainConnection)();
});
io.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(socket.id);
    const URL = "amqp://localhost:5672";
    let newData = [];
    const connect = yield amqplib_1.default.connect(URL);
    const channel = yield connect.createChannel();
    yield channel.assertQueue("send");
    yield channel.consume("send", (res) => __awaiter(void 0, void 0, void 0, function* () {
        yield channel.assertQueue("sendChat");
        yield channel.consume("sendChat", (res) => __awaiter(void 0, void 0, void 0, function* () {
            newData.push(yield JSON.parse(res === null || res === void 0 ? void 0 : res.content.toString()));
            yield notifyModel_1.default.create({
                notice: {
                    data: yield JSON.parse(res === null || res === void 0 ? void 0 : res.content.toString()),
                    message: "coming from chat"
                }
            });
            console.log(newData);
            socket.emit("set07i", yield newData);
            yield channel.ack(res);
        }));
    }));
    // await channel.consume("send", async(res: any) => {
    //     newData.push(await JSON.parse(res?.content.toString()));
    //     socket.emit("set07i", await newData);
    //     await channel.ack(res)
    // })
}));
