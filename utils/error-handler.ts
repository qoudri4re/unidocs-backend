import { Response } from "express";

export function handleApiError(error: any, res: Response) {
  const isDev = process.env.NODE_ENV === "development";
  const message = isDev
    ? error?.message || "An error occurred"
    : "An internal server error occurred";
  const details = isDev && error?.stack ? { stack: error.stack } : {};
  res.status(500).json({ success: false, message, ...details });
}
