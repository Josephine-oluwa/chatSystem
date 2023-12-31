"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notifyController_1 = require("../controller/notifyController");
const router = (0, express_1.Router)();
router.route("/notify").post(notifyController_1.createNotice);
router.route("/read-notify").get(notifyController_1.readNotice);
exports.default = router;
