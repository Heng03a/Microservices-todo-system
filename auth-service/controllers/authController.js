const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const { username, password } = req.body;

  // Demo user for portfolio learning stage
  const demoUser = {
    id: 1,
    username: "boss",
    password: "123456",
    role: "user"
  };

  if (username !== demoUser.username || password !== demoUser.password) {
    return res.status(401).json({
      message: "Invalid username or password"
    });
  }

  const token = jwt.sign(
    {
      userId: demoUser.id,
      username: demoUser.username,
      role: demoUser.role
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return res.json({
    message: "Login successful",
    token
  });
};

module.exports = { login };
