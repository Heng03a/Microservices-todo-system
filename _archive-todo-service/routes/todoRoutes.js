const express = require("express");
const verifyToken = require("../middleware/authMiddleware");

const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
} = require("../controllers/todoController");

const router = express.Router();

router.get("/", verifyToken, getTodos);
router.post("/", verifyToken, createTodo);
router.put("/:id", verifyToken, updateTodo);
router.delete("/:id", verifyToken, deleteTodo);

module.exports = router;
