import {Router} from "express"
import { createChatMessage, readChatMessage } from "../controller/chatMessageController"

const router: Router = Router()

router.route("/create-chat-message/:authID/:chatID").post(createChatMessage)

router.route("/read-chat-message/:chatID").get(readChatMessage)

export default router 