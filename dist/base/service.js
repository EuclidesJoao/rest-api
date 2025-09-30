"use strict";
// import { ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';
// import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';
// import { getSkipNumber, getPagingObject } from './lib/paging-helper';
Object.defineProperty(exports, "__esModule", { value: true });
exports.getService = getService;
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
    }
    return Service;
}
//# sourceMappingURL=service.js.map