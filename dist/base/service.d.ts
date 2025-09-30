import { Repository, ObjectLiteral } from "typeorm";
export declare function getService<Entity extends ObjectLiteral, DTOClass extends object>(entity: new () => Entity): {
    new (repository: Repository<Entity>): {
        readonly repository: Repository<Entity>;
        create(data: DTOClass): Promise<import("typeorm").InsertResult>;
    };
};
//# sourceMappingURL=service.d.ts.map