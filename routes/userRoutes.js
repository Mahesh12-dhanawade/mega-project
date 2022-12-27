const express = require("express");
const router = express.Router();
const { UserController } = require("../controllers/userController")
// import UserController from "../controllers/userController";
const {checkUserAuth} = require("../middlewares/auth-middleware.js")
// import checkUserAuth from "../middlewares/auth-middleware";

// ROute Level Middleware - To Protect Route
router.use("/changepassword", checkUserAuth);
router.use("/loggeduser", checkUserAuth);

// Public Routes
router.post("/register", UserController.userRegistration);
router.post("/login", UserController.userLogin);
router.post(
  "/send-reset-password-email",
  UserController.sendUserPasswordResetEmail
);
router.post("/reset-password/:id/:token", UserController.userPasswordReset);

// Protected Routes
router.post("/changepassword", UserController.changeUserPassword);
router.get("/loggeduser", UserController.loggedUser);

module.exports = router;
