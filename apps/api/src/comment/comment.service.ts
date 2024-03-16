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
    await this.commentRepo.save(comment);
    return {
      content: comment.content,
      createdAt: comment.createdAt,
      user: {
        id: fromUser.id,
        picture: fromUser.picture,
        name: fromUser.name,
      },
    };
  }

  async findAll(page, postId: number) {
    const post = await this.postRepo.findOneBy({ id: postId });
    const perPage = 6;
    const skip = (page - 1) * perPage;
    if (!post) throw new NotFoundException();

    return this.commentRepo
      .createQueryBuilder('comment')
      .where('comment.postId = :postId', { postId })
      .leftJoinAndSelect('comment.user', 'user')
      .select([
        'comment.id',
        'comment.content',
        'comment.createdAt',
        'user.id',
        'user.name',
        'user.picture',
      ])
      .orderBy('comment.createdAt', 'DESC')
      .skip(skip)
      .take(perPage)
      .getMany();
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
    });
    console.log(comment);
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
