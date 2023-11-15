import express from "express";

export const userAuthMiddleware = () => (req: express.Request, res: express.Response, next: express.NextFunction) => {
  req.user = { id: req.headers.user as string };

  return next();
};
