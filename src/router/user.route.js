const express = require("express");
const router = express.Router;
const userController = require("../controllers/user.controller");
const {authMiddleware} = require("../middlewares/auth");


router.post('/login', userController.Login);
router.get('/protected', authMiddleware, userController.protectedRoute);





module.exports = router;