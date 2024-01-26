import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from 'src/project/entities/project.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, length: 30 })
  firstName: string;

  @Column({ nullable: false, length: 30 })
  lastName: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column()
  avatar_url: string;

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];
}
