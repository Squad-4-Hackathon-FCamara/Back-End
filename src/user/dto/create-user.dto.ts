import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30, {
    message: `firstName: O primeiro nome deve ter no máximo 30 caracteres`,
  })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30, {
    message: `lastName: O último nome deve ter no máximo 30 caracteres`,
  })
  lastName: string;

  @IsEmail({}, { message: `email: O email deve ser válido` })
  email: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minUppercase: 1,
      minSymbols: 1,
      minNumbers: 1,
      minLowercase: 1,
    },
    {
      message:
        'password: A senha deve conter pelo menos 8 caracteres, sendo eles no mínimo 1 maiúsculo, 1 maiúsculo, 1 símbolo e 1 número.',
    },
  )
  password: string;
}
