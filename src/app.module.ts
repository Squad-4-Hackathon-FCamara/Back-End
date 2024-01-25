import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: String(process.env.DB_URL),
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    UserModule,
    ProjectModule,
    TagModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
