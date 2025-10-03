"use strict";
// import { ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';
// import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';
// import { getSkipNumber, getPagingObject } from './lib/paging-helper';
Object.defineProperty(exports, "__esModule", { value: true });
exports.getService = getService;
//Generic Function Definition
function getService(entity) {
    class Service {
        constructor(repository) {
            this.repository = repository;
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
        async updateById(id, data) {
            const updateData = await this.repository
                .createQueryBuilder()
                .update(entity)
                .set({ ...data })
                .where("id = :id", { id })
                .execute();
            return updateData;
        }
        async deleteById(id) {
            const deletedData = await this.repository
                .createQueryBuilder()
                .delete()
                .from(entity)
                .where("id = :id", { id });
            return deletedData;
        }
    }
    return Service;
}
//# sourceMappingURL=service.js.map