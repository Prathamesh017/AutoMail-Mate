import express from "express";
import dotenv from "dotenv";
import emailRouter from "./routes/route.js";
import cors from "cors";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URL;
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.use("/email",emailRouter);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
