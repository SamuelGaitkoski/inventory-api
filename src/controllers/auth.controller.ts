import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { User } from "../models/user.model";
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
}