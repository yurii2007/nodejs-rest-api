const express = require("express");
const { validate } = require("../../middlewares/validate");
const controller = require("../../controllers/users");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validate(schemas.registerSchema), controller.register);

router.post("/login", validate(schemas.loginSchema), controller.login);

router.post("/logout", (req, res) => {});

router.get("/current", (req, res) => {});

module.exports = router