require("dotenv").config();
const express = require("express");
const cors = require("cors");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Todo Service Running");
});

app.use("/todos", todoRoutes);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Todo Service running on port ${PORT}`);
});
