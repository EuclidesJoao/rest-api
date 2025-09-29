"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getService = getService;
const paging_helper_1 = require("./lib/paging-helper");
function getService(entity, dtoClass) {
    class Service {
        constructor(repository) {
            this.repository = repository;
        }
        getTableName() {
            const { tableName } = this.repository.manager.connection.getMetadata(entity);
            return tableName;
        }
        getEntityRelationsArray() {
            const relations = this.repository.manager.connection
                .getMetadata(this.getTableName())
                .relations.map((relation) => relation.inverseEntityMetadata)
                .map((relation) => relation.targetName);
            return relations;
        }
        setRelationsQueryBuilder(queryBuilder) {
            const tableName = this.getTableName();
            const relationsTableNames = this.getEntityRelationsArray();
            relationsTableNames.forEach((relationTableName) => {
                queryBuilder.innerJoinAndSelect(`${tableName}.fk${relationTableName}`, relationTableName);
            });
            return queryBuilder;
        }
        setWhereForColumns(queryBuilder, searchTerm) {
            let isFirst = true;
            const tableName = this.getTableName();
            function getQuery(column) {
                return `CAST(${tableName}.${column.databaseNameWithoutPrefixes} AS TEXT) ILIKE :searchTerm`;
            }
            function setProperWhere(column) {
                if (isFirst) {
                    queryBuilder.where(getQuery(column), {
                        searchTerm: `${searchTerm}%`,
                    });
                    isFirst = !isFirst;
                }
                else {
                    queryBuilder.orWhere(getQuery(column), {
                        searchTerm: `${searchTerm}%`,
                    });
                }
            }
            function setWhere(column) {
                if (!column.relationMetadata) {
                    setProperWhere(column);
                }
            }
            this.repository.manager.connection
                .getMetadata(this.getTableName())
                .ownColumns.forEach(setWhere);
            return queryBuilder;
        }
        setWhereForRelations(queryBuilder, searchTerm) {
            function getQuery(column) {
                const tableName = column.entityMetadata.targetName;
                return `CAST(${tableName}.${column.propertyName} AS TEXT) ILIKE :searchTerm`;
            }
            function setProperWhere(column) {
                queryBuilder.orWhere(getQuery(column), {
                    searchTerm: `${searchTerm}%`,
                });
            }
            function setWhere(column) {
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
        setWhereStatement(queryBuilder, searchTerm) {
            this.setWhereForColumns(queryBuilder, searchTerm);
            this.setWhereForRelations(queryBuilder, searchTerm);
            return queryBuilder;
        }
        async find(page, rows, searchTerm = '') {
            const queryBuilder = this.repository.createQueryBuilder(this.getTableName());
            const relations = this.setRelationsQueryBuilder(queryBuilder);
            const where = this.setWhereStatement(relations, searchTerm);
            const [data, count] = await where
                .take(rows)
                .skip((0, paging_helper_1.getSkipNumber)(page, rows))
                .getManyAndCount();
            return (0, paging_helper_1.getPagingObject)(data, count, page, rows);
        }
        async findAll(searchTerm = '') {
            const queryBuilder = this.repository.createQueryBuilder(this.getTableName());
            const relations = this.setRelationsQueryBuilder(queryBuilder);
            const where = this.setWhereStatement(relations, searchTerm);
            const data = await where.getMany();
            return data;
        }
        async create(data) {
            const newData = await this.repository
                .createQueryBuilder()
                .insert()
                .into(entity)
                .values({ ...data })
                .execute();
            return newData;
        }
        async findById(id) {
            const data = await this.repository
                .createQueryBuilder()
                .where('id = :id', { id })
                .getOne();
            return data;
        }
        async deleteById(id) {
            const data = await this.repository
                .createQueryBuilder()
                .delete()
                .from(entity)
                .where('id = :id', { id })
                .execute();
            return data;
        }
        async updateById(id, data) {
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
//# sourceMappingURL=service.js.map