import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../types/custom";
interface JwtPayload {
  id: string;
}

export const authenticateJWT = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token." });
    return;
  }

  try {
    const decoded: JwtPayload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;
    req.user = decoded;
    next();
  } catch (err) {
    res
      .status(403)
      .json({ success: false, message: "Invalid ord expired token." });
  }
};
