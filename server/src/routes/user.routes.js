const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  updateUserRole,
  updateUserStatus,
  deleteUser
} = require("../controllers/user.controller");

const auth = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");


router.use(auth);


router.use(roleMiddleware("ADMIN"));

// GET /api/users
router.get("/", getAllUsers);

// GET /api/users/:userId

router.get("/:userId", getUserById);

// PUT /api/users/:userId/role
 
router.put("/:userId/role", updateUserRole);

//PUT /api/users/:userId/status
 
router.put("/:userId/status", updateUserStatus);

// DELETE /api/users/:userId
 
router.delete("/:userId", deleteUser);

module.exports = router;
