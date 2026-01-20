import express from "express";
import cors from "cors";
import MainRoutes from "./src/rotues/MainRoutes.js";
import path from 'path'
const app = express();


app.use(express.json());


app.use(cors({
    origin: ["http://localhost:5173", "https://your-frontend-url.com"]
}));

app.use(express.static(path.join(__dirname, "../public")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});
app.use('/api', MainRoutes);

export default app;
