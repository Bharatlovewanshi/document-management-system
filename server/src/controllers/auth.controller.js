const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const { generateToken } = require("../utils/jwt.util");
const { successResponse, errorResponse } = require("../utils/response.util");


const register = async (req, res) => {
  try {
    console.log("Register 1");
    const { name, email, password, role } = req.body;
    console.log("Register 2");
    // 1. Validate input
    if (!name || !email || !password) {
      return errorResponse(res, "All fields are required", 400);
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, "User already exists", 409);
    }

    // 3. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role // optional, defaults to VIEWER
    });

    // 5. Generate token
    const token = generateToken(user._id);

    // 6. Send response
    console.log("User registered successfully: ", user.email);
    return successResponse(
      res,
      "User registered successfully",
      {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      },
      201
    );
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Registration failed", 500);
  }
};

const login = async (req, res) => {
  try {
    //console.log("Login Server 1");
    const { email, password } = req.body;
    //console.log("Login Server 2");
    //console.log(email, password);
    // 1. Validate input
    if (!email || !password) {
      return errorResponse(res, "Email and password are required", 400);
    }

    // 2. Find user
    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, "Invalid credentials", 401);
    }

    // 3. Check if user is active
    if (!user.isActive) {
      return errorResponse(res, "User account is disabled", 403);
    }

    // 4. Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorResponse(res, "Invalid credentials", 401);
    }

    // 5. Generate token
    const token = generateToken(user._id);

    // 6. Send response
    //console.log("Login successfully");
    //console.log(token);
    return successResponse(res, "Login successful", {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Login failed", 500);
  }
};

const getProfile = async (req, res) => {
  try {
    return successResponse(res, "User profile fetched", req.user);
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Failed to fetch profile", 500);
  }
};

module.exports = {
  register,
  login,
  getProfile
};
