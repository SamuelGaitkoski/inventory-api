import { AppDataSource } from "../config/database";
import { Category } from "../entities/category.entity";

export class CategoryService {
  private categoryRepository = AppDataSource.getRepository(Category);

  async getAll() {
    return this.categoryRepository.find({ relations: ["products"] });
  }

  async getById(id: number) {
    return this.categoryRepository.findOne({
      where: { id },
      relations: ["products"]
    });
  }

  async create(name: string) {
    const category = this.categoryRepository.create({ name });
    await this.categoryRepository.save(category);
  }

  async update(id: number, name: string) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      return null;
    }

    category.name = name ?? category.name;
    return this.categoryRepository.save(category);
  }

  async delete(id: number) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      return null;
    }

    return this.categoryRepository.remove(category);
  }
}