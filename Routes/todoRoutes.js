const express = require("express");
const { protect } = require("../middlewares/protect");
const {
  createTodo,
  getTodos,
  deleteTodo,
  updateTodo,
} = require("../Controllers/todoControllers");

const router = express.Router();

// @ Create Todo
// /api/todos
// private

router.post("/", protect, createTodo);

// @ Get Todos
// /api/todos
router.get("/", getTodos);

// @ delete Todo
// /api/todos
router.delete("/:id", deleteTodo);

// @ Updated Todo
// /api/todos
router.put("/:id", updateTodo);

module.exports = router;
