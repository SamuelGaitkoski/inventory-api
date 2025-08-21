import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../enums/user-role.enum";
import { BaseEntity } from "./base.entity";

@Entity({ name: "TB_USER" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ 
    type: "enum", 
    enum: UserRole, 
    default: UserRole.USER 
  })
  role!: UserRole;
}