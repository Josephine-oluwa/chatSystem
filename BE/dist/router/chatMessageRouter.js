"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatMessageController_1 = require("../controller/chatMessageController");
const router = (0, express_1.Router)();
router.route("/create-chat-message/:authID/:chatID").post(chatMessageController_1.createChatMessage);
router.route("/read-chat-message/:chatID").get(chatMessageController_1.readChatMessage);
exports.default = router;
