import jwt from "jsonwebtoken";

export const handler = async (event) => {
  try {
    if (event.requestContext?.http?.method === "OPTIONS") {
      return response(200, { message: "CORS OK" });
    }

    const body = event.body ? JSON.parse(event.body) : {};
    const { username, password } = body;

    const validUsername = process.env.LOGIN_USERNAME || "admin";
    const validPassword = process.env.LOGIN_PASSWORD || "password123";
    const jwtSecret = process.env.JWT_SECRET || "change-this-secret";

    if (!username || !password) {
      return response(400, { message: "Username and password are required" });
    }

    if (username !== validUsername || password !== validPassword) {
      return response(401, { message: "Invalid username or password" });
    }

    const token = jwt.sign(
      {
        username,
        role: "user",
      },
      jwtSecret,
      {
        expiresIn: "1h",
      }
    );

    return response(200, {
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Login Lambda error:", error);
    return response(500, { message: "Login failed" });
  }
};

function response(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type,Authorization",
    },
    body: JSON.stringify(body),
  };
}
