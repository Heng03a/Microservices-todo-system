import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// ✅ Demo login (later we upgrade to DB)
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // 🔐 simple test user
  if (username === "boss@test.com" && password === "123456") {
    const token = jwt.sign(
      { username },
      process.env.JWT_SECRET || "dev-secret",
      { expiresIn: "1h" }
    );

    return res.json({
      message: "Login successful",
      token,
    });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

export default router;