import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.model";

@Entity({ name: "TB_PRODUCT" })
export class Product {
  @PrimaryGeneratedColumn
  id: number;

  @Column()
  name: string;

  @Column("decimal")
  price: number;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: "category_id" })
  category: Category;
}