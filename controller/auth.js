const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../error");
const User = require("../models/auth");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) throw new UnauthenticatedError("Invalid email or password");
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect)
    throw new UnauthenticatedError("Invalid email or password");
  const token = await user.generateToken();

  res
    .status(StatusCodes.OK)
    .json({ success: true, user: { name: user.name, token } });
};
const register = async (req, res) => {
  const { password, name, email } = req.body;

  if (!password) {
    throw new BadRequestError("Please provide password ");
  }
  if (!email) {
    throw new BadRequestError("Please provide email ");
  }
  if (!name) {
    throw new BadRequestError("Please provide name");
  }

  const user = await User.create({ ...req.body });
  const token = await user.generateToken();
  res.status(StatusCodes.CREATED).json({ success: true, token });
};

module.exports = {
  login,
  register,
};
