"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controller/authController");
const Router = express_1.default.Router();
Router.route("/create-auth").post(authController_1.createAuth);
Router.route("/signIn-auth").post(authController_1.signInAuth);
Router.route("/find-one-auth/:authID").get(authController_1.findOneAuth);
Router.route("/find-all-auth").get(authController_1.findAllAuth);
Router.route("/un-friend/:authID/:friendID").patch(authController_1.unFriend);
Router.route("/make-friend/:authID/:friendID").patch(authController_1.makeFriends);
exports.default = Router;
