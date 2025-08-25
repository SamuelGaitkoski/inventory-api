import { NextFunction, Request, Response } from "express";
import { UserRole } from "../enums/user-role.enum";
import jwt from "jsonwebtoken";

export type AuthUser = {
  id: number;
  email: string;
  role: UserRole;
};

export interface AuthenticatedRequest extends Request {
  user?: AuthUser;
};

export function authenticateToken(
  req: AuthenticatedRequest, 
  res: Response, 
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "secret") as AuthUser;
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

export function authorizeRoles(...roles: UserRole[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!roles.includes(user.role)) {
      return res.status(403).json({ message: "Forbidden: insufficient rights" });
    }

    next();
  };
}