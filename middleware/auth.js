const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../error");
const authenticationMiddleware = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication required");
  }
  const token = authorization?.split(" ")[1];
  try {
    const { id, name } = jwt.verify(token, process.env.JSON_TOKEN);
    req.user = {
      id,
      name,
    };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};
module.exports = authenticationMiddleware;
