import { Request, Response, NextFunction, Router } from "express";

const router = Router();

router.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.send("wassup");
});

export default router;
