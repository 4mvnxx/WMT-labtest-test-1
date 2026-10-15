const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]); // fixes querySrv ECONNREFUSED

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());          // lets the deployed frontend call this backend
app.use(express.json());  // lets us read JSON from req.body

app.get("/", (req, res) => res.send("Item Manager API is running"));
app.use("/api/items", require("./routes/items"));

const PORT = process.env.PORT || 5000;

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is missing. Check that backend/.env exists and the name is exactly MONGO_URI.");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err.message));