const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

/** 
 * @desc Get all users (Admin Only)
 * @route GET /api/users
 * @access Private (Admin)
 */
router.get("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password field
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/** 
 * @desc Get a single user
 * @route GET /api/users/:id
 * @access Private (Authenticated Users)
 */
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/** 
 * @desc Update user (Admin or User)
 * @route PUT /api/users/:id
 * @access Private (Admin or User)
 */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;
    
    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Allow only admins to update roles
    if (req.user.role !== "admin" && role) {
      return res.status(403).json({ error: "Only admins can update roles" });
    }

    // Update user data
    if (userName) user.userName = userName;
    if (email) user.email = email;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    if (role) user.role = role;

    await user.save();
    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/** 
 * @desc Delete user (Admin Only)
 * @route DELETE /api/users/:id
 * @access Private (Admin)
 */
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    await user.deleteOne();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
