import { Request, Response } from "express";
import { comparePassword } from "../services/authService";
import { generateToken } from "../services/authService";
import { SuperAdmin } from "../models";

export async function dashboard(req: Request, res: Response): Promise<void> {
  res.status(200).json({ success: true, message: "Dashboard" });
}

export async function loginSuperAdmin(
  req: Request,
  res: Response
): Promise<void> {
  const { username, password } = req.body;

  const user = await SuperAdmin.findOne({ where: { username } });
  if (!user) {
    res.status(401).json({ success: false, message: "Invalid credentials" });
    return;
  }
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    res.status(401).json({ success: false, message: "Invalid credentials" });
    return;
  }
  const token = await generateToken({ id: user.id });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 1000,
  });
  res
    .status(200)
    .json({ success: true, message: "User logged in successfully" });
}
