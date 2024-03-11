import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { Post } from '../post/entities/post.entity';
import { Notification } from '../notification/entities/notification.entity';
import { User } from '../user/entities/user.entity';
import { JwtPayload } from '../auth/dto/jwtPayload';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Notification)
    private readonly NotifyRepo: Repository<Notification>,
  ) {}

  async create(createCommentDto: CreateCommentDto, user: JwtPayload) {
    const post: Post = await this.postRepo.findOne({
      where: {
        id: +createCommentDto.postId,
      },
    });

    if (!post) throw new NotFoundException();

    const fromUser: User = await this.userRepo.findOneBy({ id: user.sub });

    const comment: Comment = this.commentRepo.create({
      postId: post.id,
      user: fromUser,
      content: createCommentDto.content,
      media: createCommentDto.media,
    });

    if (user.sub !== post.userId) {
      const notification: Notification = this.NotifyRepo.create({
        content: `${fromUser.name} has add comment in your post`,
        from: fromUser,
        toId: post.userId,
      });
      this.NotifyRepo.save(notification);
    }
    return this.commentRepo.save(comment);
  }

  findAll() {
    return `This action returns all comment`;
  }

  findOne(id: number) {
    return this.commentRepo.findOneBy({ id });
  }

  async update(
    id: number,
    updateCommentDto: UpdateCommentDto,
    user: JwtPayload,
  ) {
    console.log(user);
    const comment: Comment = await this.commentRepo.findOneBy({
      id,
      userId: user.sub,
    });

    if (!comment) throw new NotFoundException();

    return this.commentRepo.save({ ...comment, ...updateCommentDto });
  }

  async remove(id: number, user: JwtPayload) {
    const comment: Comment = await this.commentRepo.findOneBy({
      id,
      userId: user.sub,
    });

    if (!comment) throw new NotFoundException();
    const del = await this.commentRepo.delete({ id });

    return del.affected && 'success';
  }
}
