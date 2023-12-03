"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const express_1 = __importDefault(require("express"));
const authRouter_1 = __importDefault(require("./router/authRouter"));
const chatRouter_1 = __importDefault(require("./router/chatRouter"));
const chatRouter_2 = __importDefault(require("./router/chatRouter"));
const noticeRouter_1 = __importDefault(require("./router/noticeRouter"));
const cors_1 = __importDefault(require("cors"));
const mainApp = (app) => {
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use("/api/auth", authRouter_1.default);
    app.use("/api/chat", chatRouter_1.default);
    app.use("/api/chatMessage", chatRouter_2.default);
    app.use("/api/notice", noticeRouter_1.default);
    app.get("/", (req, res) => {
        try {
            return res.status(201).json({
                message: "welcome to the social app"
            });
        }
        catch (error) {
            return res.status(404).json({
                message: "Error",
                data: error.message
            });
        }
    });
};
exports.mainApp = mainApp;
