const express = require("express");
const router = express.Router();
const userController = require("../../controllers/api/user");
const ensureLoggedIn = require("../../config/loggedIn");

//ROUTES:

//POST  '/api/users/signup'
router.post("/", userController.create);

//POST - '/api/users/login'
router.post("/login", userController.login);

//GET  '/api/users/check-token'
router.get("/check-token", ensureLoggedIn, userController.checkToken);

module.exports = router;
