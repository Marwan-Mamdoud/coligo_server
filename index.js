import express from "express";
import cors from "cors";
import connectDB from "./lib/ConnectDB.js";
import errorHandler from "./lib/HundleErrors.js";
import AnnouncementsRoutes from "./Announcements/Announcements.routes.js";
import QuizzesRoutes from "./Quizzes/Quizzes.routes.js";
import dotenv from "dotenv";
import { getMainData } from "./Main/Main.controller.js";

dotenv.config({ override: true });
const app = express();

const CorsOptions = {
  origin: [process.env.CLIENT_URL],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Middleware
app.use(cors(CorsOptions));
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use("/announcements", AnnouncementsRoutes);
app.use("/quizzes", QuizzesRoutes);
app.use("/main", async (req, res, next) => await getMainData(req, res, next));
// Default route
app.get("/", (req, res) => {
  res.send("Coligo Server API is running...");
});

// Error handling middleware (optional)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
