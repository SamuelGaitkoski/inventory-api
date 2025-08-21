import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { BaseEntity } from "./base.entity";

@Entity({ name: "TB_CATEGORY" })
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => Product, (product) => product.category)
  products!: Product[];
}