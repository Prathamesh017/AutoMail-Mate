import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { WebSocketServer } from 'ws';
import emailRouter from "./routes/route.ts";


dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors())
let client: any;


app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
app.use("/email", emailRouter);
export const server = app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});


export function notifyClient() {
  client.send("New Email Notification");
}
const wsServer = new WebSocketServer({ server });
wsServer.on('connection', function (connection: any) {
  console.log("Web Socket Connection")
  client = connection;
})



