import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { PostLove } from './entities/postLove.entity';
import { NotificationService } from '../notification/notification.service';
import { Notification } from '../notification/entities/notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, PostLove, Notification])],
  controllers: [PostController],
  providers: [UserService, PostService, NotificationService],
})
export class PostModule {}
