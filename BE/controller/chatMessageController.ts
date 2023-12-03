import express, {Request, Response} from "express"
import chatMessageModel from "../model/chatMessageModel";
import amqplib from "amqplib"

export const createChatMessage = async (req: any, res: Response) => {
    try {
        const {authID, chatID} = req.params
        const {message} = req.body;

        const chatMessage = await chatMessageModel.create({
            authID,
            chatID,
            message
        })
        const  Url: string = "ampq://localhost:5672";
        const connect = await amqplib.connect(Url);
        const channel = await connect.createChannel();

        await channel.sendToQueue(
            "sendChat",
            Buffer.from(JSON.stringify(chatMessage))
        )

        return res.status(201).json({
            message: "create message",
            data: chatMessage

        })

        
    } catch (error) {
       return res.status(404).json({
        message: "chat message created"
       }) 
    }
}



export const readChatMessage = async (req: any, res: Response) => {
    try {
        const {chatID} = req.params
       

        const chatMessage = await chatMessageModel.find({
           
            chatID,
          
        })

        return res.status(201).json({
            message: "read chat message",
            data: chatMessage
        })
        
    } catch (error) {
       return res.status(404).json({
        message: "chat message created"
       }) 
    }
}