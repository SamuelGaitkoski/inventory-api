import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({ type: "timestamp", nullable: true })
  createdAt!: Date | null;

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  updatedAt!: Date | null;
}