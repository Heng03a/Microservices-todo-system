require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("API Gateway Running");
});

app.use(
  "/auth",
  createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL,
    changeOrigin: true
  })
);

app.use(
  "/todos",
  createProxyMiddleware({
    target: process.env.TODO_SERVICE_URL,
    changeOrigin: true
  })
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
