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

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, length: 30 })
  title: string;

  @Column({ nullable: false })
  url: string;

  @Column({ nullable: false, length: 350 })
  description: string;

  @Column({ nullable: false })
  thumbnail_url: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.projects)
  user: User;

  @ManyToMany(() => Tag)
  @JoinTable({ name: 'projects_tags' })
  tags: Tag[];
}
