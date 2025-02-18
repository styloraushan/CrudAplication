import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/userRoute.js";

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 8000;
const URL = process.env.MONGOURL;

mongoose
    .connect(URL)
    .then(() => console.log("DB connected successfully"))
    .catch((error) => console.log("DB Connection Error:", error));

app.use("/api", route);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
