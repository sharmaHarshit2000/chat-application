const express = require("express");
const {registerUser, loginUser,getAllUser} = require("../controllers/userController.js")
const router = express.Router();
const uploadMiddleware = require("../middlewares/multer.js");

const upload = uploadMiddleware("profilePics");

router.post("/register", upload.single("pic"), registerUser);
router.post("/login", loginUser);
router.get("/", getAllUser)

module.exports = router;