import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from "body-parser";
import { Connection } from "./database/db.js";
import router from "./routes/route.js";

const app = express();

app.use(cors({
    origin: '*'
}));
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(router)

dotenv.config()

const PORT = 8000;
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running at port ${process.env.PORT || PORT}`);
})

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;   

Connection(USERNAME, PASSWORD);