const express = require("express");

const protect = require("../middlewares/authMiddleware.js");

const router = express.Router();

// router.post("/", protect,  accessChat);
// router.get("/", protect,  fetchChats);
// router.post("/group", protect,  createGroup);
// router.put("/rename", protect,  renameGroup);
// router.put("/groupremove", protect,  removeFromGroup);
// router.put("/groupadd", protect,  addToGroup);

module.exports = router;
