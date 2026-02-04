const User = require("../models/user.model");
const { successResponse, errorResponse } = require("../utils/response.util");


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return successResponse(res, "Users fetched successfully", users);
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Failed to fetch users", 500);
  }
};


const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");

    if (!user) {
      return errorResponse(res, "User not found", 404);
    }

    return successResponse(res, "User fetched successfully", user);
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Failed to fetch user", 500);
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!["ADMIN", "EDITOR", "VIEWER"].includes(role)) {
      return errorResponse(res, "Invalid role", 400);
    }

    const user = await User.findById(req.params.userId);

    if (!user) {
      return errorResponse(res, "User not found", 404);
    }

    user.role = role;
    await user.save();

    return successResponse(res, "User role updated successfully", {
      id: user._id,
      role: user.role
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Failed to update user role", 500);
  }
};


const updateUserStatus = async (req, res) => {
  try {
    const { isActive } = req.body;

    const user = await User.findById(req.params.userId);

    if (!user) {
      return errorResponse(res, "User not found", 404);
    }

    user.isActive = isActive;
    await user.save();

    return successResponse(res, "User status updated successfully", {
      id: user._id,
      isActive: user.isActive
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Failed to update user status", 500);
  }
};


const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return errorResponse(res, "User not found", 404);
    }

    user.isActive = false;
    await user.save();

    return successResponse(res, "User deleted (deactivated) successfully");
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Failed to delete user", 500);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserRole,
  updateUserStatus,
  deleteUser
};
