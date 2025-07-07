import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
require("dotenv").config();

export async function generateToken(payload: { id: string }) {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1h" });
}

export async function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET!);
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
