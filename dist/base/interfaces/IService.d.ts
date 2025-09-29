export interface IService {
    find(pageNumber: number, rowsNumber: number, searchTerm?: string): any;
    findAll(searchTerm?: string): any;
    create(data: object): any;
    deleteById(id: number): any;
    updateById(id: number, data: object): any;
    [key: string]: any;
}
//# sourceMappingURL=IService.d.ts.map