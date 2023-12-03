import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Post } from 'src/post/entities/post.entity';
import { Notification } from 'src/notification/entities/notification.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Post, Notification, User])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
