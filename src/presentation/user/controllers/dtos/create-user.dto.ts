import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDTO {
  @IsString({ message: 'firstName deve ser uma string.' })
  @IsNotEmpty()
  firstName: string;

  @IsString({ message: 'lastName deve ser uma string.' })
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsString({
    message: 'email deve conter um email com uma estrutura válida.',
  })
  email: string;

  @IsStrongPassword({
    minNumbers: 2,
    minLength: 7,
    minSymbols: 0,
    minUppercase: 1,
  })
  @IsString({
    message:
      'password deve conter uma palavra com 7 caracteres no minímo, 2 números e uma letra maíscula.',
  })
  password: string;

  @IsPhoneNumber('AO', {
    message: 'phoneNumber deve conter um número de telefone válido',
  })
  phoneNumber: string;

  @IsDateString()
  @IsString({
    message: 'birthDate deve conter uma data com esta estrutura 1998-01-06',
  })
  birthDate: string;

  @IsNumberString()
  @IsString({
    message:
      'fkUserType deve conter a chave estrangeira do tipo de usuário que se pretende criar.',
  })
  fkUserType: number;
}
