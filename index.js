// index.js or app.js
const express = require("express");
const bodyParser = require("body-parser"); // Optional if using Express 4.16.0 or later
require("dotenv").config(); // To load environment variables

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Routes
const adminRoutes = require("./routes/admin");
app.use("/admin", adminRoutes);

app.listen(port, "172.20.10.9", () => {
  console.log(`Server is running on port ${port}`);
});
