import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { UserRole } from "../enums/user-role.enum";

const authService = new AuthService();

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { email, password, role } = req.body;
      const user = await authService.register(email, password, role || UserRole.USER);
      return res.status(201).json({ message: "User registered successfully", user });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}