require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const documentRoutes = require("./routes/document.routes");
const versionRoutes = require("./routes/version.routes");
const userRoutes = require("./routes/user.routes");

const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

// Global Middlewares

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//API Routes
 
app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/versions", versionRoutes);
app.use("/api/users", userRoutes);

//Health Check

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "DMS backend is running"
  });
});

// Global Error Handler (MUST be last)

app.use(errorMiddleware);

module.exports = app;
