import express, {Application, Request, Response} from "express";
import auth from "./router/authRouter"
import chat from "./router/chatRouter"
import chatMessage from "./router/chatRouter"
import notice from "./router/noticeRouter"
import cors from "cors"


export const mainApp = (app: Application) => {
        app.use(express.json())
        app.use(cors())
       app.use("/api/auth", auth)
       app.use("/api/chat", chat)
       app.use("/api/chatMessage", chatMessage)
       app.use("/api/notice", notice)

       app.get("/", (req: Request, res: Response) => {
        try {
            return res.status(201).json({
                message: "welcome to the social app"
            })
        } catch (error: any) {
            return res.status(404).json({
                message: "Error",
                data: error.message
            })
        }
       })
    }