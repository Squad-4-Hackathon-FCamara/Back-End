import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from 'src/user/entities/user.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column({ nullable: false, length: 30 })
  @ApiProperty()
  title: string;

  @Column({ nullable: false })
  @ApiProperty()
  url: string;

  @Column({ length: 350, nullable: true })
  @ApiProperty()
  description: string;

  @Column({ nullable: true })
  @ApiProperty()
  thumbnail_url: string;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.projects)
  @ApiProperty({ type: () => User })
  user: User;

  @ManyToMany(() => Tag)
  @ApiProperty()
  @JoinTable({ name: 'projects_tags' })
  tags: Tag[];
}
