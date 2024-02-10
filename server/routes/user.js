const express = require("express");
const users = require("../controllers/user.js");
const auth = require("../middleware/auth.js");

const router = express.Router();

// GET A CURRENT LOGGED IN USER
router.get("/:id", auth.verifyToken, users.getCurrentUser);

// GET All UserInfo
router.get("", users.getAllUsers);

// GET UserInfo by Id
router.get("/getUser/:id", users.getUserById);

module.exports = router;
