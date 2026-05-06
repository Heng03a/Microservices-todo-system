let todos = [
  { id: 1, title: "Learn microservices", completed: false },
  { id: 2, title: "Protect Todo Service with JWT", completed: false }
];

const getTodos = (req, res) => {
  res.json({
    user: req.user,
    data: todos
  });
};

const createTodo = (req, res) => {
  const { title } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ message: "Todo title is required." });
  }

  const newTodo = {
    id: Date.now(),
    title: title.trim(),
    completed: false
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
};

const updateTodo = (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find(t => Number(t.id) === id);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found." });
  }

  todo.title = req.body.title ?? todo.title;
  todo.completed = req.body.completed ?? todo.completed;

  res.json(todo);
};

const deleteTodo = (req, res) => {
  const id = Number(req.params.id);
  const originalLength = todos.length;

  todos = todos.filter(t => Number(t.id) !== id);

  if (todos.length === originalLength) {
    return res.status(404).json({ message: "Todo not found." });
  }

  res.json({ message: "Todo deleted successfully." });
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
};
