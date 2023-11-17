import {Request, Response} from "express"
import notifyModel from "../model/notifyModel"

import amqplib from "amqplib"

export const createNotice = async (req: Request, res: Response) => {
    try {
        const {notice} = req.body;

        const URL: string = "amqp:localhost:5672";
        let newData: any = [] 

        const connect = await amqplib.connect(URL)
        const channel = await connect.createChannel();
        await channel.assertQueue("sendNotification")

        await channel.consume("sendNotification", async (res: any) => {
            newData.push(await JSON.parse(res?.content.toString))
       

        await channel.sendToQueue("send", Buffer.from(JSON.stringify(res)))

        await notifyModel.create({
            notice: res
        })

        await channel.ack(res);
    })
        return res.status(201).json({
            message: "notice created",
            data: notice
        })
    } catch (error) {
        return res.status(404).json({
            message: "Error"
        })
    }
}