import { AppDataSource } from "../config/database";
import { Product } from "../entities/product.entity";

export class ProductService {
  private productRepository = AppDataSource.getRepository(Product);

  async getAll() {
    return this.productRepository.find({ relations: ["category"] });
  }

  async getById(id: number) {
    return this.productRepository.findOne({
      where: { id },
      relations: ["products"]
    });
  }

  async create(name: string) {
    const category = this.productRepository.create({ name });
    await this.productRepository.save(category);
  }

  async update(id: number, name: string) {
    const category = await this.productRepository.findOneBy({ id });
    if (!category) {
      return null;
    }

    category.name = name ?? category.name;
    return this.productRepository.save(category);
  }

  async delete(id: number) {
    const category = await this.productRepository.findOneBy({ id });
    if (!category) {
      return null;
    }

    return this.productRepository.remove(category);
  }
}