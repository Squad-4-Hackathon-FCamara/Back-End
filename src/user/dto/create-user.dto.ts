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
  @MaxLength(30)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  lastName: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minSymbols: 1,
    minNumbers: 1,
  })
  password: string;
}
