const express = require("express");
const validate = require("../../middlewares/validate");
const controller = require("../../controllers/users");
const { schemas } = require("../../models/user");
const authentication = require("../../middlewares/authentication");
const upload = require("../../middlewares/upload");

const router = express.Router();

router.post("/register", validate(schemas.registerSchema), controller.register);

router.get("/verify/:verificationToken", controller.verifyEmail);

router.post("/verify", validate(schemas.emailSchema), controller.resendVerify)

router.post("/login", validate(schemas.loginSchema), controller.login);

router.post("/logout", authentication, controller.logout);

router.get("/current", authentication, controller.current);

router.patch("/", authentication, controller.updateSubscription);

router.patch("/avatars", authentication, upload.single("avatar"), controller.updateAvatar);

module.exports = router;