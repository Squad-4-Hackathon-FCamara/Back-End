import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Project } from 'src/project/entities/project.entity';
import { ProjectService } from 'src/project/project.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject(forwardRef(() => ProjectService)) private projectService: ProjectService,
  ) {}

  async create(createUserDto: CreateUserDto, userGoogle = false) {
    const newUser: User = this.userRepository.create({ ...createUserDto, google: userGoogle });
    newUser.password = await bcrypt.hash(createUserDto.password, await bcrypt.genSalt(10));
    newUser.avatar_url = `https://api.dicebear.com/7.x/thumbs/svg?seed=${newUser.email}&scale=150&radius=50&eyes=variant1W16,variant2W10,variant2W12,variant2W14,variant2W16,variant3W10,variant3W12,variant3W14,variant3W16,variant4W10,variant4W12,variant4W14,variant4W16,variant5W10,variant5W12,variant5W14,variant5W16,variant6W10,variant6W12,variant6W14,variant6W16,variant7W10,variant7W12,variant7W14,variant7W16,variant8W10,variant8W12,variant8W14,variant8W16,variant9W10,variant9W12,variant9W14,variant9W16,variant1W12,variant1W10,variant1W14&eyesColor=FFEECC&mouthColor=FFEECC&shapeColor=FFAA66,FF5522,315FCE,183594`;
    return await this.userRepository.save({ ...newUser, google: userGoogle });
  }

  async findOne(id: string) {
    const user: User = await this.userRepository.findOne({
      where: { id },
      relations: { projects: true },
      select: {
        avatar_url: true,
        firstName: true,
        lastName: true,
        id: true,
        projects: true,
      },
    });

    if (!user) throw new NotFoundException('Usuário não encontrado');

    user.projects = await this.projectService.findAllByUser(user.id);

    return user;
  }

  async findOneByEmail(email: string, userGoogle = false) {
    const user: User = await this.userRepository.findOne({ where: { email } });
    if (!userGoogle) if (!user) throw new NotFoundException('Usuário ou senha inválidos!');
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
