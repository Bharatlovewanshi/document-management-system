require("dotenv").config();
const http = require("http");
const app = require("./app");
const connectDB = require("./config/db");


 //Connect to MongoDB

connectDB();

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`DMS Server running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err.message);
  server.close(() => process.exit(1));
});
