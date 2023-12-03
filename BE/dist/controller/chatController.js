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
exports.findChat = exports.findOneChat = exports.createChat = void 0;
const authModel_1 = __importDefault(require("../model/authModel"));
const chatModel_1 = __importDefault(require("../model/chatModel"));
const amqplib_1 = __importDefault(require("amqplib"));
const createChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authID, friendID } = req.params;
        const user = yield authModel_1.default.findById(authID);
        const friend = yield authModel_1.default.findById(friendID);
        const findUserFriend = user === null || user === void 0 ? void 0 : user.friend.some((el) => el === friendID);
        const findFriendFriend = friend === null || friend === void 0 ? void 0 : friend.friend.some((el) => el === authID);
        if (findFriendFriend && findUserFriend) {
            const chat = yield chatModel_1.default.create({
                member: [authID, friendID]
            });
            const URL = "amqp://localhost:5672";
            const connect = yield amqplib_1.default.connect(URL);
            const channel = yield connect.createChannel();
            yield channel.sendToQueue("sendChat", Buffer.from(JSON.stringify(chat)));
            return res.status(201).json({
                message: "chat created",
                data: chat,
            });
        }
        else {
            return res.status(404).json({
                message: "You are not friends",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error"
        });
    }
});
exports.createChat = createChat;
const findOneChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authID, friendID } = req.params;
        const chat = yield chatModel_1.default.findOne({
            member: {
                $all: [authID, friendID]
            }
        });
        return res.status(200).json({
            message: "chat created",
            data: chat
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error"
        });
    }
});
exports.findOneChat = findOneChat;
const findChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authID = req.params;
        const chat = yield chatModel_1.default.find({
            member: {
                $in: [authID]
            }
        });
        return res.status(201).json({
            message: "chat created",
            data: chat
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error"
        });
    }
});
exports.findChat = findChat;
