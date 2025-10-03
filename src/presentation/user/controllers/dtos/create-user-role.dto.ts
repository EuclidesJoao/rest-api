import { IsString, IsNotEmpty, IsEnum, IsOptional } from "class-validator";

enum Status{
    Active='Activo',
    Inactivo='Inactivo',
}
export class CreateUserRoleDTO{
    @IsString({message: "O campo designação deve ser uma string"})
    @IsNotEmpty()
    designacao: string

    @IsString({message: "O campo descrição deve ser uma string"})
    @IsNotEmpty()
    description: string

    @IsOptional()
    @IsEnum(Status, {message: "Foi fornecido um estado inválido"})
    status: string
}