import { ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';
import { getSkipNumber, getPagingObject } from './lib/paging-helper';

export function getService<
  Entity extends ObjectLiteral,
  DTOClass extends object,
>(entity: new () => Entity, dtoClass: new () => DTOClass) {
  class Service {
    constructor(public readonly repository: Repository<Entity>) {}

    private getTableName() {
      const { tableName } =
        this.repository.manager.connection.getMetadata(entity);
      return tableName;
    }

    private getEntityRelationsArray() {
      const relations = this.repository.manager.connection
        .getMetadata(this.getTableName())
        .relations.map((relation) => relation.inverseEntityMetadata)
        .map((relation) => relation.targetName);

      return relations;
    }

    private setRelationsQueryBuilder(queryBuilder: SelectQueryBuilder<Entity>) {
      const tableName = this.getTableName();
      const relationsTableNames = this.getEntityRelationsArray();

      relationsTableNames.forEach((relationTableName) => {
        queryBuilder.innerJoinAndSelect(
          `${tableName}.fk${relationTableName}`,
          relationTableName,
        );
      });

      return queryBuilder;
    }

    private setWhereForColumns(
      queryBuilder: SelectQueryBuilder<Entity>,
      searchTerm: string,
    ) {
      let isFirst = true;
      const tableName = this.getTableName();

      function getQuery(column: ColumnMetadata) {
        return `CAST(${tableName}.${column.databaseNameWithoutPrefixes} AS TEXT) ILIKE :searchTerm`;
      }

      function setProperWhere(column: ColumnMetadata) {
        if (isFirst) {
          queryBuilder.where(getQuery(column), {
            searchTerm: `${searchTerm}%`,
          });
          isFirst = !isFirst;
        } else {
          queryBuilder.orWhere(getQuery(column), {
            searchTerm: `${searchTerm}%`,
          });
        }
      }

      function setWhere(column: ColumnMetadata) {
        if (!column.relationMetadata) {
          setProperWhere(column);
        }
      }

      this.repository.manager.connection
        .getMetadata(this.getTableName())
        .ownColumns.forEach(setWhere);
      
      return queryBuilder;
    }

    private setWhereForRelations(
      queryBuilder: SelectQueryBuilder<Entity>,
      searchTerm: string,
    ) {
      function getQuery(column: ColumnMetadata) {
        const tableName = column.entityMetadata.targetName;
        return `CAST(${tableName}.${column.propertyName} AS TEXT) ILIKE :searchTerm`;
      }

      function setProperWhere(column: ColumnMetadata) {
        queryBuilder.orWhere(getQuery(column), {
          searchTerm: `${searchTerm}%`,
        });
      }

      function setWhere(column: ColumnMetadata) {
        if (!column.isPrimary && !column.relationMetadata) {
          setProperWhere(column);
        }
      }

      this.repository.manager.connection
        .getMetadata(this.getTableName())
        .relations.map((relation) => relation.inverseEntityMetadata)
        .forEach((relation) => {
          relation.columns.forEach(setWhere);
        });
      return queryBuilder;
    }

    private setWhereStatement(
      queryBuilder: SelectQueryBuilder<Entity>,
      searchTerm: string,
    ) {
      this.setWhereForColumns(queryBuilder, searchTerm);
      this.setWhereForRelations(queryBuilder, searchTerm);
      return queryBuilder;
    }

    public async find(page: number, rows: number, searchTerm: string = '') {
      const queryBuilder = this.repository.createQueryBuilder(
        this.getTableName(),
      );
      const relations = this.setRelationsQueryBuilder(queryBuilder);
      const where = this.setWhereStatement(relations, searchTerm);

      const [data, count] = await where
        .take(rows)
        .skip(getSkipNumber(page, rows))
        .getManyAndCount();

      return getPagingObject(data, count, page, rows);
    }

    async findAll(searchTerm: string = '') {
      const queryBuilder = this.repository.createQueryBuilder(
        this.getTableName(),
      );
      const relations = this.setRelationsQueryBuilder(queryBuilder);
      const where = this.setWhereStatement(relations, searchTerm);

      const data = await where.getMany();
      return data;
    }

    async create(data: DTOClass) {
      const newData = await this.repository
        .createQueryBuilder()
        .insert()
        .into(entity)
        .values({ ...data })
        .execute();

      return newData;
    }

    async findById(id: number) {
      const data = await this.repository
        .createQueryBuilder()
        .where('id = :id', { id })
        .getOne();

      return data;
    }

    async deleteById(id: number) {
      const data = await this.repository
        .createQueryBuilder()
        .delete()
        .from(entity)
        .where('id = :id', { id })
        .execute();

      return data;
    }

    async updateById(id: number, data: Partial<Entity>) {
      const updateData = await this.repository
        .createQueryBuilder()
        .update(entity)
        .set({ ...data })
        .where('id = :id', { id })
        .execute();

      return updateData;
    }
  }
  return Service;
}
