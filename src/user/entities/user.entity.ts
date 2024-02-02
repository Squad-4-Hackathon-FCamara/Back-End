import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from 'src/project/entities/project.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column({ nullable: false, length: 30 })
  @ApiProperty()
  firstName: string;

  @Column({ nullable: false, length: 30 })
  @ApiProperty()
  lastName: string;

  @Column({ nullable: false, unique: true })
  @ApiProperty()
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  @ApiProperty()
  avatar_url: string;

  @OneToMany(() => Project, (project) => project.user)
  @ApiProperty({ type: () => [Project] })
  projects: Project[];

  @Column({ default: false })
  google: boolean;
}
