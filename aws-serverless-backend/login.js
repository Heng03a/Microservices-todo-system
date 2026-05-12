import jwt from "jsonwebtoken";

const corsHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin":
    "http://microservices-todo-frontend-phua-kia-heng.s3-website-us-east-1.amazonaws.com",
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
};

const JWT_SECRET = process.env.JWT_SECRET || "boss-demo-secret-key";

export const handler = async (event) => {
  if (event.requestContext?.http?.method === "OPTIONS") {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: "",
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { email, password } = body;

    if (!email || !password) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          message: "Email and password are required",
        }),
      };
    }

    if (email !== "boss@test.com" || password !== "123456") {
      return {
        statusCode: 401,
        headers: corsHeaders,
        body: JSON.stringify({
          message: "Invalid email or password",
        }),
      };
    }

    const token = jwt.sign(
      {
        email,
        role: "user",
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        message: "Login successful",
        token,
      }),
    };
  } catch (error) {
    console.error("LOGIN error:", error);

    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        message: "Login failed",
      }),
    };
  }
};
