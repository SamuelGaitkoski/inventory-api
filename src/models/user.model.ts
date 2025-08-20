import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../enums/user-role.enum";

@Entity({ name: "TB_USER" })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ 
    type: "enum", 
    enum: ["admin", "user"], 
    default: "user" 
  })
  role!: UserRole;
}