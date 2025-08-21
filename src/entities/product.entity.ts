import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";
import { BaseEntity } from "./base.entity";

@Entity({ name: "TB_PRODUCT" })
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column("decimal")
  price!: number;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: "category_id" })
  category!: Category;
}