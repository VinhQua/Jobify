import jwt from "jsonwebtoken";
import { UnAuthenticatedError, UnAuthorizedError } from "../errors/index.js";

const auth = async (req, res, next) => {
  const { token } = req.signedCookies;
  if (!token) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const testUser = payload.userId === "63628d5d178e918562ef9ce8";
    req.user = { userId: payload.userId, role: payload.role, testUser };
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
};
const authorizePermission = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      return next();
    }
    throw new UnAuthorizedError("Permission Denied");
  };
};
export { auth, authorizePermission };
