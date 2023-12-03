import express, {Application} from "express"
import http from "http"
import { mainConnection } from "./config/Db"
import { mainApp } from "./mainApp"
import {Server, Socket} from "socket.io"
import cors from "cors"
import { DefaultEventsMap } from "socket.io/dist/typed-events"
import amqplib from "amqplib"
import notifyModel from "./model/notifyModel"



const port: number = 6622
const app: Application = express()
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

app.use(cors())
app.use(express.json());


mainApp(app)
server.listen(port, () => {
    console.log("server is connected")
    mainConnection();
})


io.on ("connection", async(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    console.log(socket.id);
    const URL: string = "amqp://localhost:5672"
    let newData: any  = [];

    const connect = await amqplib.connect(URL)
    const channel = await connect.createChannel()
    await channel.assertQueue("send");
    await channel.consume("send", async (res: any) => {
        await channel.assertQueue("sendChat");

        await channel.consume("sendChat", async (res: any) => {
            newData.push(await JSON.parse(res?.content.toString()));

            await notifyModel.create({
                notice: {
                    data: await JSON.parse(res?.content.toString()),
                    message: "coming from chat"
                }
            })
            console.log(newData);
            socket.emit("set07i", await newData);
            await channel.ack(res)

        })
    })




    // await channel.consume("send", async(res: any) => {
    //     newData.push(await JSON.parse(res?.content.toString()));

    //     socket.emit("set07i", await newData);

    //     await channel.ack(res)
    // })
});















