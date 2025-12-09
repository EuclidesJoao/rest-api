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

  async findAll(): Promise<T[]> {
    try {
      return this.repository.findAll();
    } catch (error) {
      throw new Error(`
        Service error fetching recordes: ${
          error instanceof Error ? error.message : "Unkown error"
        }   
        `);
    }
  }

  async findById(id: string): Promise<T | null> {
    try {
      return await this.repository.findById(id);
    } catch (error) {
      throw new Error(`
        Servicer error fetching record: ${
          error instanceof Error ? error.message : "Unknown error"
        }
        `);
    }
  }

  async delete(id: string | number): Promise<boolean> {
    try {
      return await this.repository.delete(id);
    } catch (error) {
      throw new Error(`
        Server error deleting record: ${
          error instanceof Error ? error.message : "Unknown Error"
        }
        `);
    }
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    try {
      console.log("THESE ARE THE VALUES BEING SENT: ", data)
      return await this.repository.update(id, data);
    } catch (error) {
      throw new Error(
        `Service error updating record: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }
}

export default GenericService;
