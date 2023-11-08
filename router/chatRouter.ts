import express from "express"
import { createChat, findChat, findOneChat } from "../controller/chatController"

const Router = express.Router()

Router.route("/create-chat/authId/:friendID").post(createChat)
Router.route("/find-chat/:authId").post(findChat)
Router.route("/find-chat/:authId/:friendID").post(findOneChat)

export default Router