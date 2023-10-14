const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { HttpError, controllerWrapper } = require("../helpers");

const { secret_word } = process.env;
const subscriptions = ["starter", "pro", "business"];

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) throw HttpError("Email in use", 409);

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ email, password: hashPassword, subscription });

  res.status(201).json({ user: { email: newUser.email, subscription: newUser.subscription } });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw HttpError("Email or password is wrong", 401);

  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) throw HttpError("Email or password is wrong", 401);

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, secret_word, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({ token, user: { email: user.email, subscription: user.subscription } });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  if (!user) throw HttpError("Not authorized", 401);

  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json();
};

const current = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  console.log(req.body);
  if(!subscriptions.includes(req.body.subscription)) throw HttpError("Bad request", 400)
  const result = await User.findByIdAndUpdate(_id, req.body, { new: true, projection: "-_id -token -password" });
  if (!result) throw HttpError("Not found", 404);
  res.status(200).json(result);
};

module.exports = {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
  logout: controllerWrapper(logout),
  current: controllerWrapper(current),
  updateSubscription: controllerWrapper(updateSubscription),
};
