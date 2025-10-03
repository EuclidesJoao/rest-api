import { Repository, ObjectLiteral } from "typeorm";
export declare function getService<Entity extends ObjectLiteral, DTOClass extends object>(entity: new () => Entity): {
    new (repository: Repository<Entity>): {
        readonly repository: Repository<Entity>;
        create(data: DTOClass): Promise<import("typeorm").InsertResult>;
        updateById(id: number, data: Partial<Entity>): Promise<import("typeorm").UpdateResult>;
        deleteById(id: number): Promise<import("typeorm").DeleteQueryBuilder<Entity>>;
    };
};
//# sourceMappingURL=service.d.ts.map