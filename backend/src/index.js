const express = require("express");
const cors = require("cors");
const config = require("./config/index");

const app = express();

// Middleware
app.use(
  cors({
    origin: config.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.get("/", (_, res) => res.send("Hello, World!"));

// Start Server
app.listen(config.PORT, () =>
  console.log(`App listening on port ${config.PORT}`)
);
