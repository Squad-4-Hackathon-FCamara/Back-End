import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ required: true })
  @IsNotEmpty({
    message: 'title: O título deve ser preenchido',
  })
  @IsString({
    message: 'title: O título deve ser uma string',
  })
  @MaxLength(30, {
    message: 'title: O título deve ter no máximo 30 caracteres',
  })
  title: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({
    message: ':url: A URL deve ser preenchida',
  })
  url: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'tags: O campo de tags não pode estar vazio' })
  @IsArray({ message: 'tags: O campo de tags deve vir como um array' })
  tags: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @MaxLength(350, {
    message: 'description: A descrição deve ter no máximo 350 caracteres',
  })
  description: string;
}
