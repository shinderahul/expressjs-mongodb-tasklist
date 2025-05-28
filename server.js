const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const taskRoutes = require("./routes/taskRoutes");
const {
  requestLogger,
  notFoundHandler,
  errorHandler,
} = require("./middleware");

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(requestLogger);

// Routes
app.use("/api", taskRoutes);

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM signal received: closing HTTP server");
  const mongoose = require("mongoose");
  await mongoose.connection.close();
  process.exit(0);
});

module.exports = app;
