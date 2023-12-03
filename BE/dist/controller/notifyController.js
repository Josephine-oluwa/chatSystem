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
exports.readNotice = exports.createNotice = void 0;
const notifyModel_1 = __importDefault(require("../model/notifyModel"));
const amqplib_1 = __importDefault(require("amqplib"));
const createNotice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Notice } = req.body;
        const URL = "amqp://localhost:5672";
        let newData = [];
        const connect = yield amqplib_1.default.connect(URL);
        const channel = yield connect.createChannel();
        yield channel.assertQueue("sendChat");
        yield channel.consume("sendChat", (res) => __awaiter(void 0, void 0, void 0, function* () {
            newData.push(yield JSON.parse(res === null || res === void 0 ? void 0 : res.content.toString()));
            yield channel.sendToQueue("send", Buffer.from(JSON.stringify(res)));
        }));
        const noticeModel = yield notifyModel_1.default.create({
            Notice: res
        });
        return res.status(201).json({
            message: "message created",
            data: noticeModel
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "message created",
            data: error.message
        });
    }
});
exports.createNotice = createNotice;
const readNotice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const readNotice = yield notifyModel_1.default.find();
        return res.status(201).json({
            message: "reading Message",
            data: readNotice
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error"
        });
    }
});
exports.readNotice = readNotice;
