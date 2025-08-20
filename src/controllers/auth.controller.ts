import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { User } from "../entities/user.entity";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRole } from "../enums/user-role.enum";

const userRepository = AppDataSource.getRepository(User);

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { email, password, role } = req.body;

      const existingUser = await userRepository.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = userRepository.create({
        email,
        password: hashedPassword,
        role: role || UserRole.USER
      });

      await userRepository.save(user);

      return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Error registering user" });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await userRepository.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
      );

      return res.json({ token });

    } catch (error) {
      return res.status(500).json({ message: "Error logging in" });
    }
  }
}