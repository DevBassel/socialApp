import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { PostLove } from './entities/postLove.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, PostLove])],
  controllers: [PostController],
  providers: [UserService, PostService],
})
export class PostModule {}
