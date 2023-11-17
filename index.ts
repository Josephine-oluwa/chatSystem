import express, { Application } from "express";
import { mainApp } from "./mainApp";
import { mainConnection } from "./config/Db";
import cors from "cors";
import http from "http"
import {Server} from "socket.io"
import amqplib from "amqplib"

const port: number = 4422;
const app: Application = express();
const server = http.createServer(app)


const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

app.use(cors())
app.use(express.json());

mainApp(app);
server.listen(port, () => {
  console.log("server is up");
  mainConnection();
});

io.on(
  "connection", async (socket) => {
    console.log(socket.id);
    const URL: string = "amqp:localhost:5672";
    let newData: any = []

    const connect = await amqplib.connect(URL);
    const channel = await connect.createChannel();
    await channel.assertQueue("send");
    await channel.consume("send", async (res: any) => {
      newData.push(await JSON.parse(res?.content.toString()));


      socket.emit("set07i", await newData)

      await channel.ack(res)
    })
  }
)