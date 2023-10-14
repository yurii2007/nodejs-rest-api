const express = require("express");
const validate = require("../../middlewares/validate");
const controller = require("../../controllers/users");
const { schemas } = require("../../models/user");
const authentication = require("../../middlewares/authentication");

const router = express.Router();

router.post("/register", validate(schemas.registerSchema), controller.register);

router.post("/login", validate(schemas.loginSchema), controller.login);

router.post("/logout", authentication, controller.logout);

router.get("/current", authentication, controller.current);

router.patch("/", authentication, controller.updateSubscription);

module.exports = router;