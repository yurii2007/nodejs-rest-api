const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const { HttpError } = require("../helpers");

const { secret_word } = process.env;

const authentication = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const token = authorization.split(" ");
  if (token[0] !== "Bearer") throw HttpError("Not authorized", 401);

  try {
    const { id } = jwt.verify(token[1], secret_word);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token[1]) {
      next(HttpError("Not authorized", 401));
    }

    req.user = user;
    next();
  } catch (error) {
    next(HttpError("Not authorized", 401));
  }
};

module.exports = authentication;