import express from "express";
import cors from "cors";
import MainRoutes from "./src/rotues/MainRoutes.js";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://moive-recommend-1.onrender.com"],
  })
);


app.use("/api", MainRoutes);


app.use(express.static(path.join(__dirname, "../public")));


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
