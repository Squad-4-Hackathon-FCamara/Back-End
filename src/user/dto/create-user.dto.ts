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
    message: `O primeiro nome deve ter no máximo 30 caracteres`,
  })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30, {
    message: `O último nome deve ter no máximo 30 caracteres`,
  })
  lastName: string;

  @IsEmail()
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
        'A senha deve conter pelo menos 8 caracteres, sendo eles no mínimo 1 maiúsculo, 1 maiúsculo, 1 símbolo e 1 número.',
    },
  )
  password: string;
}
