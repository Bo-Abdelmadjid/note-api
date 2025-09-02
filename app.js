import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import noteRouter from "./routes/noteRoutes.js";
import authRouter from "./routes/authRoutes.js";
dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/notes", authRouter);
app.use("/api/notes", noteRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Server running at: http://localhost:${PORT}`)
);
