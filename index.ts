import express, { Application } from "express";


import { mainApp } from "./mainApp";
import { mainConnection } from "./config/Db";
import cors from "cors";

const port: number = 3322;
const app: Application = express();

app.use(cors({origin:"*"}))
app.use(express.json());

mainApp(app);
app.listen(port, () => {
  console.log();
  mainConnection();
});