import { AppDataSource } from "../config/database";
import { Category } from "../entities/category.entity";
import { Product } from "../entities/product.entity";

export class ProductService {
  private productRepository = AppDataSource.getRepository(Product);
  private categoryRepository = AppDataSource.getRepository(Category);

  async getAll() {
    return this.productRepository.find({ relations: ["category"] });
  }

  async getById(id: number) {
    return this.productRepository.findOne({
      where: { id },
      relations: ["category"]
    });
  }

  async create(name: string, price: number, categoryId: number) {
    const category = await this.categoryRepository.findOneBy({ id: categoryId });
    if (!category) {
      return null;
    }

    const product = this.productRepository.create({ name, price, category });
    return this.productRepository.save(product);
  }

  async update(id: number, name?: string, price?: number, categoryId?: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ["category"]
    });
    if (!product) {
      return null;
    }

    if (categoryId) {
      const category = await this.categoryRepository.findOneBy({ id: categoryId });
      if (!category) {
        return null;
      }
      product.category = category;
    }

    product.name = name ?? product.name;
    product.price = price ?? product.price;

    return this.productRepository.save(product);
  }

  async delete(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      return null;
    }

    return this.productRepository.remove(product);
  }
}