import GenericRepository from "../repo/generic.repository";

class GenericService<T> {
  protected repository: GenericRepository<T>;

  constructor(repository: GenericRepository<T>) {
    this.repository = repository;
  }

  async create(data: Partial<T>): Promise<T> {
    try {
      return await this.repository.create(data);
    } catch (error) {
      throw new Error(
        `Service error creating record: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async delete() {
    try {
      return this.repository.delete();
    } catch (error) {
      throw new Error();
    }
  }
}

export default GenericService;
