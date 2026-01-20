import express from "express";
import cors from "cors";
import MainRoutes from "./src/rotues/MainRoutes.js";

const app = express();


app.use(express.json());


app.use(cors({
    origin: "http://localhost:5173" 
}));


app.use('/api', MainRoutes);

export default app;
