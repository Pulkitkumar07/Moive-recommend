import express from "express";
import cors from "cors";
import MainRoutes from "./src/rotues/MainRoutes.js";
import path from 'path'
const app = express();


app.use(express.json());


app.use(cors({
  origin: ["https://moive-recommend-1.onrender.com"] 
}));


app.use(express.static(path.join(__dirname, "../public")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});
app.use('/api', MainRoutes);

export default app;
