"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatController_1 = require("../controller/chatController");
const Router = express_1.default.Router();
Router.route("/create-chat/authId/:friendID").post(chatController_1.createChat);
Router.route("/find-chat/:authId").post(chatController_1.findChat);
Router.route("/find-chat/:authId/:friendID").post(chatController_1.findOneChat);
exports.default = Router;
