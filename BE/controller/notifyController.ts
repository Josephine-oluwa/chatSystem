import {Request, Response} from "express"
import notifyModel from "../model/notifyModel"

import amqplib from "amqplib";

export const createNotice = async (req: Request, res: Response) => {
    try {
        const {Notice} = req.body

        const URL: string = "amqp://localhost:5672";
        let newData: any = []

        const connect = await amqplib.connect(URL);
        const channel = await connect.createChannel();
        await channel.assertQueue("sendChat");

        await channel.consume("sendChat", async (res: any) => {
            newData.push(await JSON.parse(res?.content.toString()));

            await channel.sendToQueue("send", Buffer.from(JSON.stringify(res)));
        })
 

        const noticeModel = await notifyModel.create({
            Notice: res
        })
return res.status(201).json({
    message: "message created",
    data: noticeModel
})

    } catch (error: any) {
        return res.status(404).json({
            message: "message created",
            data: error.message
        }) 
    }
}


export const readNotice = async (req: any, res: Response) => {
    try {
        const readNotice = await notifyModel.find();

        return res.status(201).json({
            message: "reading Message",
            data: readNotice
        })
    } catch (error: any) {
        return res.status(404).json({
            message: "Error"
        })
    }
}