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
exports.readChatMessage = exports.createChatMessage = void 0;
const chatMessageModel_1 = __importDefault(require("../model/chatMessageModel"));
const amqplib_1 = __importDefault(require("amqplib"));
const createChatMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authID, chatID } = req.params;
        const { message } = req.body;
        const chatMessage = yield chatMessageModel_1.default.create({
            authID,
            chatID,
            message
        });
        const Url = "ampq://localhost:5672";
        const connect = yield amqplib_1.default.connect(Url);
        const channel = yield connect.createChannel();
        yield channel.sendToQueue("sendChat", Buffer.from(JSON.stringify(chatMessage)));
        return res.status(201).json({
            message: "create message",
            data: chatMessage
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "chat message created"
        });
    }
});
exports.createChatMessage = createChatMessage;
const readChatMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chatID } = req.params;
        const chatMessage = yield chatMessageModel_1.default.find({
            chatID,
        });
        return res.status(201).json({
            message: "read chat message",
            data: chatMessage
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "chat message created"
        });
    }
});
exports.readChatMessage = readChatMessage;
