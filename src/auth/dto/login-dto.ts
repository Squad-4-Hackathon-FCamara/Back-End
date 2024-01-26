import { IsEmail, IsStrongPassword } from 'class-validator';

export class LoginDto {
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
